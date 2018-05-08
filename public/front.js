$(
    function () {
        var socket = io();
        var msgInput = $("#new-msg");
        var username = $("#name").text();
        var room = $("#room").text();
        console.log(username, room);
        $('#msg-form').submit(function () {
            if (msgInput.val().trim() === '') return false;
            socket.emit("msg", {
                room,
                username,
                msg: msgInput.val()
            });
            msgInput.val('');
            return false;
        })
    }
);