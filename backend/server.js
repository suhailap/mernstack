const express = require('express')
const app = express();
const PORT = 4578
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://userone:userone@cluster0.fgjorlm.mongodb.net/")
.then(()=>{console.log("MongoDB connected successfully")})
.catch(()=>{console.log("Error connecting to MongoDB")})



app.get('/', function (req, res) {
  res.send('SERVER IS RUNNING')
})

app.get('/about',(reg,res)=>{
    res.send('About')
})
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});