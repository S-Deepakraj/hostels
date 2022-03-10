const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/hostelDB?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoose.connect(url, { useNewUrlParser: true })
const Schema = mongoose.Schema

const hostelSchema = new Schema({
    name: String,
    hostelno: Number,
    rooms: String,
    warden_name: String,
    mess_capacity: Number
  
},{collection: 'hostel'})
const hostel= mongoose.model('Hostel',hostelSchema)


const app = express();
app.listen(3000,function(){
    console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({extended: true}))



app.post('/hostel',(req,res)=>{
    console.log(req.body);
    //res.send("Im Deepak")
    res.json(req.body)
    const hostelobj = new hostel(req.body)
    hostelobj.save();
})

app.get('/hostel',async (req,res)=>{
    const list=await hostel.find()
    res.json(list);
    
})

app.put('/hostel',async (req,res)=>{
    const dat=req.body.hostelno;
    let va = await hostel.findOne({'hostelno':dat})
    console.log(va);
    if(req.body.name)
        va.name=req.body.name;
    va.save();
    console.log(req.body);
    //res.send("Im Deepak")
    res.json(req.body)
    
})

app.delete('/hostel',async (req,res)=>{
    const no=req.body.hostelno;
    let del = await hostel.findOneAndDelete({'hostelno': no})

    console.log(req.body);
    //res.send("Im Deepak")
    res.json(req.body)
    
})





    

