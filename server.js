let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

let Message = mongoose.model('Message',{
  name : String,
  message : String
})

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);
    await message.save()
    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message send')
  }
})

io.on('connection', () =>{
  console.log('a user is connected')
})

//Use cloud
//let databaseUrl = 'mongodb+srv://yolo:yolo@cluster0.0jc8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Use local storage
let databaseUrl = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoose.connect(databaseUrl, {	
    useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

let server = http.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});