const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
const db = mongoose.connect('mongodb://127.0.0.1:27017/todo');
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/todo',(req,res) => {
    Todo.getTodos((err,Todos)=>{
        if(err){
            throw err
        }
        res.json(Todos)
    })
})

app.post('/api/todo',(req,res) => {
    console.log()
    const activiy = req.body
    Todo.addTodos(activiy,(err,Todos)=>{
        if(err){
            throw err
        }
        res.json(activiy)
    })
})

app.delete('/api/todo/delete/:_id',(req,res) => {
    const id = req.params._id;
        Todo.deleteTodo(id,(err)=>{
            if(err){
                throw err
            }
            res.json(id)
        })
})

app.put('/api/todo/update/:_id',(req,res)=>{
    const id = req.params._id;
    const data = req.body;
    Todo.updateTodo(id,data,(err=>{
        if(err){
            throw err
        }
        res.json(data)
    }))
})

app.listen(3030, () => console.log('Example app listening on port 3030!'))