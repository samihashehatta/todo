const express =require('express');
const app = express();
const port = 8080;
const todoRoutes = require('./routes/todo');
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/views'))
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile('index.html')
});

app.use('/api/todos',todoRoutes);

app.listen(port,()=>{
    console.log('app is runing')
});