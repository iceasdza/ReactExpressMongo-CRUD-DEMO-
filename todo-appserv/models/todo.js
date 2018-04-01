const mongoose = require('mongoose');

// Todos Schema

const Todos = mongoose.Schema({
        activity:{
            type: String
        },
        create_date:{
            type:Date,
            default: Date.now
        }
});

const Todo = module.exports = mongoose.model('Todos',Todos)


module.exports.getTodos = (callback,limit) =>{
    Todo.find(callback).limit(limit)
}

module.exports.addTodos = (activity,callback) =>{
    Todo.create(activity,callback);
}

module.exports.deleteTodo = (id,callback) =>{
    const query = {_id :id}
    Todo.remove(query,callback);
}

module.exports.updateTodo = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        activity : data.activity
    }

    Todo.findOneAndUpdate(query,updatedData,option,callback)
}
