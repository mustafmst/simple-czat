var map = {
    "<3": "\u2764\uFE0F",
    "</3": "\uD83D\uDC94",
    ":D": "\uD83D\uDE00",
    ":)": "\uD83D\uDE03",
    ";)": "\uD83D\uDE09",
    ":(": "\uD83D\uDE12",
    ":p": "\uD83D\uDE1B",
    ";p": "\uD83D\uDE1C",
    ":'(": "\uD83D\uDE22"
};

function escapeSpecialChars(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

function printMessage(user, msg, mine) {
    var list = $("#inner");
    var className = mine ? "mine-msg" : "other-msg";
    var val = msg;
    for (var i in map) {
        var regex = new RegExp(escapeSpecialChars(i), 'gim');
        val = val.replace(regex, map[i]);
    }
    list.append(`<div class="${className} row"><div class="card col"><div class="card-body"><div class="card-title"><b>${user}</b></div class="content">${val}</div></div></div>`);
}

function updateUsersList(list, activeUser) {
    var ul = $("#room-users");
    ul.empty();
    list.forEach(user => {
        var className = "room-user";
        if(user === activeUser) className = "active-room-user";
        ul.append(`<li class="${className}">${user}</li>`);
    });
}

$(
    function () {
        var socket = io();
        var msgInput = $("#new-msg");
        var username = $(".active-user").text();
        var room = $("#room").text();
        socket.emit('register', {
            username,
            room
        });

        // Send message
        $('#msg-form').submit(function () {
            if (msgInput.val().trim() === '') return false;
            socket.emit("msg", {
                room,
                username,
                msg: msgInput.val()
            });
            msgInput.val('');
            return false;
        });

        // Recive message
        socket.on(`msg-${room}`, function (msg) {
            printMessage(msg.user, msg.msg, msg.user === username);
            $("#list").scrollTop($("#inner").height());
        });

        // Update Users
        socket.on(`users-${room}`, function (msg) {
            updateUsersList(msg.users, username);
        });
    }
);