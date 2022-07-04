require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const { createServer } = require('http');
const cookirParser = require('cookie-parser')

const bodyParser = require('body-parser');
const dbconnect = require('./db')
dbconnect()

app.use(cookirParser())  // immmmmpooo

//function
const router = require('./routes');

const io = require('socket.io')(createServer(app)); // live chat

const PORT = process.env.PORT || 5000;

const options = {
    origin: ['http://localhost:3000'], // while giving credentials true// u have to pass specific origin
    credentials: true,
 }

app.use(cors(options))
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send("satya.js");
});

app.use(router)

io.on('connection', (socket) => {
    console.log('Socket.io is connected', socket);

    socket.on("live-chat", () => {
        console.log("ghghggh");
    })
});

createServer(app).listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

