function printMessage(user, msg, mine) {
    var list = $("#list");
    var className = mine ? "mine-msg" : "other-msg";
    list.append(`<li class="${className}">${user} : ${msg}</li>`);
}

$(
    function () {
        var socket = io();
        var msgInput = $("#new-msg");
        var username = $("#name").text();
        var room = $("#room").text();
        
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
        })
    }
);