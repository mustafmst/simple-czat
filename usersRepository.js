const rooms = {};

function addUser(user, room) {
    console.log("add user")
    if(rooms[room] === undefined){
        rooms[room] = [];
    }
    else {
        var existing = rooms[room].filter(u => u === user);
        if(existing.length !== 0){
            return false;
        }
    }
    rooms[room].push(user);
    console.log("User added", rooms);
    return true;
}

function deleteUser(user,room) {
    if(rooms[room] === undefined) return;
    rooms[room] = rooms[room].filter(u => u !== user);
    console.log("User removed",rooms);
}

function getUsers(room) {
    if(rooms[room] === undefined) return;
    console.log(rooms[room]);
    return rooms[room];
}

module.exports = {
    addUser,
    deleteUser,
    getUsers
};