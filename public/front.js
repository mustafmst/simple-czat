function printMessage(user, msg, mine) {
    var list = $("#list");
    var className = mine ? "mine-msg" : "other-msg";
    list.append(`<div class="${className} row"><div class="card col"><div class="card-body"><div class="card-title"><b>${user}</b></div>${msg}</div></div></div>`);
}

$(
    function () {
        var socket = io();
        var msgInput = $("#new-msg");
        var username = $("#name").text();
        var room = $("#room").text();
        socket.emit('register', {
            username,
            room
        });

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

        socket.on(`msg-${room}`, function(msg){
            printMessage(msg.user, msg.msg, msg.user === username);
            $("#list").animate({scrollTop: $("#list").height()});
        })
    }
);