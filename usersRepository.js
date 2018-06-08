const rooms = {};

function addUser(user, room) {
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
    return true;
}

function deleteUser(user,room) {
    if(rooms[room] === undefined) return;
    rooms[room] = rooms[room].filter(u => u !== user);
}

function getUsers(room) {
    if(rooms[room] === undefined) return;
    return rooms[room];
}

module.exports = {
    addUser,
    deleteUser,
    getUsers
};