import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const PORT = 3000;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/TasklistDB');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const Months = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
   const Days = ['Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dateObj.getUTCDate();
    const dayName = dateObj.getUTCDay();
    const year = dateObj.getUTCFullYear();
    const todayName = Days[dayName];
    const today = `${day} ${Months[month]} ${year}`
    const Me = allTask
    

    res.render("index.ejs", {
        date: today,
        todayName: todayName,
        tasks: Me
    })
    
})



const task = new mongoose.Schema({
    task: String
})

const Tasks = mongoose.model('Task', task);

const firstTask = new Tasks({
    task: "Fresh Up"
})

// 

const allTask = await Tasks.find()




app.post("/submit", (req,res) => {
    const taskName = req.body["task"]
    const addTask = new Tasks({
        task: `${taskName}`
     })
     Tasks.insertMany(addTask)
     const newTask = req.body
    console.log(taskName)

    res.redirect("/")
    


})


app.listen(PORT, ()=>{
    
    console.log(`Server is Running on ${PORT}`)
    
});