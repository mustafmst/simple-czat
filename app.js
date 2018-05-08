const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const userRepo = require('./usersRepository');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/room", (req, res) => {
    const loginData = {
        name: req.query.name,
        room: req.query.room
    };
    let error = {
        occured: false,
        msg: ""
    };
    if(loginData.name === null || loginData.name === undefined || loginData.name.trim() === ""){
        error.occured = true;
        error.msg += "Invalid name provided! ";
    }
    if(loginData.room === null || loginData.room === undefined || loginData.room.trim() === ""){
        error.occured = true;
        error.msg += "Invalid room provided! ";
    }
    if(error.occured){
        res.send(error.msg);
    }
    if(userRepo.addUser(loginData.name, loginData.room)){
        res.render('chat',{userData:loginData});
    }
    else {
        res.send("Such user is already loged in.");
    }
});

io.on('connection', function(socket) {
    console.log("User connected");

    socket.on('msg', function(msg){
        console.log(msg);
    })

    socket.on('disconnect', function(){
        console.log("User disconnected");
    })
})

http.listen(3000, () => {
    console.log('App is running on port 3000');
});