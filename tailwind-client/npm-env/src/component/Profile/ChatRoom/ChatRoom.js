import React, { useEffect, useState, useReducer, useRef } from 'react';
import Gun from 'gun';
import './chatroom.css';
const gun = Gun({
	peers: [ `${process.env.REACT_APP_SERVER_URL}/gun` ]
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
	const chatRef = useRef(null);
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
		if (user) {
			const messages = gun.get('messages').get(props.userp.username);
			messages.map().once((m) => {
				dispatch({
					username: m.username,
					message: m.message,
					createdAt: m.createdAt
				});
				chatRef.current?.scrollIntoView({behavior:"smooth"});
			}, true);
		}else{
			window.location.href = "/";
		}
	}, []);

	// set a new message in gun, update the local state to reset the form field
	function saveMessage() {
		const messages = gun.get('messages').get(props.userp.username);
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
		<div className="voicechannel px-5 h-max lg:col-span-5 col-span-6 w-full mt-16">
			<div className="chat-container">
				<header className="chat-header">
					<h1>
						<i className="fas fa-smile" /> ChatCord
					</h1>
					<a onClick={()=> window.location.href = '/'} className="btn">
						Leave Room
					</a>
				</header>
				<main className="chat-main">
					<div className="chat-sidebar">
						<h3>
							<i className="fas fa-comments" /> Room Name:
						</h3>
						<h2 id="room-name">{props.userp.username}</h2>
					</div>
					<div className="chat-messages" >
						{state.messages.map((message) => (
							<div className="message" key={message.createdAt}>
								<p className="meta">
									{message.username} <span>{message.createdAt}</span>
								</p>
								<p className="text">{message.message}</p>
							</div>
						))}
						<div ref={chatRef} />
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
