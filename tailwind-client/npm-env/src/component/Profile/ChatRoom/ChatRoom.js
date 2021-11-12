import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import './chatroom.css';
const gun = Gun({
	peers: [ 'http://localhost:3030/gun' ]
});
console.log('lslsls');
// create the initial state to hold the messages
const initialState = {
	messages: []
};

// Create a reducer that will update the messages array
function reducer(state, message) {
	return {
		messages: [ ...state.messages, message ]
	};
}

// to get loggedin user from   localstorage
const user = JSON.parse(window.localStorage.getItem('user'));

function ChatRoom(props) {
	// the form state manages the form input for creating a new message
	const [ formState, setForm ] = useState({
		message: ''
	});

	// initialize the reducer & state for holding the messages array
	const [ state, dispatch ] = useReducer(reducer, initialState);

	// when the app loads, fetch the current messages and load them into the state
	// this also subscribes to new data as it changes and updates the local state

	useEffect(() => {
		// initialize gun locally
		console.log(props.match.params.username);
		console.log(user);
		const messages = gun.get('messages').get(props.match.params.username);
		messages.map().once((m) => {
			console.log(m);
			dispatch({
				username: m.username,
				message: m.message,
				createdAt: m.createdAt
			});
		}, true);
	}, []);

	// set a new message in gun, update the local state to reset the form field
	function saveMessage() {
		const messages = gun.get('messages').get(props.match.params.username);
		messages.set({
			username: user.username,
			message: formState.message,
			createdAt: Date.now()
		});
		setForm({
			message: ''
		});
	}

	// update the form state as the user types
	function onChange(e) {
		setForm({ ...formState, [e.target.name]: e.target.value });
	}

	return (
		<div className="voicechannel">
			<div className="chat-container">
				<header className="chat-header">
					<h1>
						<i className="fas fa-smile" /> ChatCord
					</h1>
					<a href="index.html" className="btn">
						Leave Room
					</a>
				</header>
				<main className="chat-main">
					<div className="chat-sidebar">
						<h3>
							<i className="fas fa-comments" /> Room Name:
						</h3>
						<h2 id="room-name" />
						<h3>
							<i className="fas fa-users" /> Users
						</h3>
						<ul id="users" />
					</div>
					<div className="chat-messages">
						{state.messages.map((message) => (
							<div className="message" key={message.createdAt}>
								<p className="meta">{message.username} <span>{message.createdAt}</span></p>
								<p className="text">{message.message}</p>
							</div>
						))}
					</div>
				</main>
				<div className="chat-form-container">
					<form id="chat-form">
						<input
							onChange={onChange}
							name="message"
							value={formState.message}
							id="msg"
							type="text"
							placeholder="Enter Message"
							required
							autoComplete={false}
						/>
						<button onClick={saveMessage} className="btn">
							<i className="fas fa-paper-plane" /> Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ChatRoom;
