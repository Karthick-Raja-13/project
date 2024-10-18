const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const mongoose =require("mongoose")
const port = 8000
mongoose.connect("mongodb://localhost:27017/New").then(()=>console.log("Database Connected Successfully")).catch((error)=>console.log(error.message))

const schema = new mongoose.Schema({
    toDo:{type:String,required:true},
    status:{type:String,required:true}
})
const data = mongoose.model("Todo List",schema)
app.use(cors())
app.use(bodyParser.json())

app.get("/alltodo",async(req,res)=>{
    try{
        const todos = await data.find()
        res.json({todos})
        console.log(todos)
    }
    catch(error){
        console.log(error.message)
    }
})
app.post("/todos/add",async(req,res)=>{
    try {
        const {toDo,status} = req.body
        const newTodo = new data({
            toDo,
            status
        })
        await newTodo.save()
         const todos = await data.find()
        res.json({todos})
    } catch (error) {
        console.log(error.message)
    }
})
app.delete("/todos/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id
        await data.deleteOne({_id:id})
        const todos = await data.find()
        res.json({todos})
        console.log(todos)
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(
    port,()=>{
        console.log("Server Running Sucessfully"); 
    }
)