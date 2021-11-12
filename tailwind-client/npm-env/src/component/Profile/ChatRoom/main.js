const submitForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// get username and room name from url
const { username, password, room, newuser } = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});
var gun = Gun({ peers: [ 'http://localhost:8765/gun' ] });

// Join Chatroom
var user = gun.user();
if (newuser == 'on') {
	user.create(username, password);
} else {
	user.auth(username, password);
}

// console.log(user)

// // Get All users from room
// socket.on('roomUsers', ({ room, users }) => {
// 	outputRoomName(room);
// 	outputUsers(users);
// });

// // Getting msg from server
// socket.on('message', (message) => {
// 	outputMessage(message);

// 	// Scroll down
//
// });

// When user submit form
submitForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const msg = e.target.elements.msg.value;
	// Sending msg to server
	var newDate = new Date();
	if (!user.is) {
		return;
	}
	gun.get(room).set({ username: username, text: msg });
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

// OutPuting the message on front end
const outputMessage = (data ,key) => {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `	<p class="meta">${data.username}</p>
    <p class="text">
       ${data.text}
    </p>`;
	document.querySelector('.chat-messages').appendChild(div);
};

// Add room name to dom
const outputRoomName = (room) => {
	roomName.innerText = room;
};
// Add users to dom
const outputUsers = (users) => {
	userList.innerHTML = `
    ${users.map((user) => `<li> ${user.username}</li>`).join('')}
    `;
};
gun.get(room).map().on((data, key) => {

		outputMessage(data, key);
		chatMessage.scrollTop = chatMessage.scrollHeight;
	
});
