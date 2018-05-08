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

module.exports = {
    addUser
};