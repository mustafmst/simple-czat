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
    console.log(rooms);
    return true;
}

function deleteUser(user,room) {
    if(rooms[room] === undefined) return;
    rooms[room] = rooms[room].filter(u => u !== user);
    console.log(rooms);
}

module.exports = {
    addUser,
    deleteUser
};