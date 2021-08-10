export const meetRoomId = (room_id) =>{
    return {
        type:'setroomId',
        payload:room_id
    }
}

export const userSignIn = (user) =>{
    return {
        type:'userSignIn',
        payload:user
    }
}

export const userLogout = () =>{
    return {
        type:'userLogout'
    }
}