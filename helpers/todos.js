const db= require('../models');


exports.getTodos = (req,res)=>
{
    db.Todo.find({})
    .then((todos)=>{
        res.json(todos)
    }).catch(err => {
        console.log(err);
    });
}


exports.createTodos =(req,res)=>{
    db.Todo.create(req.body)
    .then(newTodo =>{
        res.status(201).json(newTodo)
        console.log(newTodo);

    }).catch(err =>
        {
            console.log(err);
        })
};
exports.searchTodo =(req,res)=>{
    db.Todo.findById(req.params.todoId)
    .then(foundTodo =>{
        res.json(foundTodo);
    }).catch(err =>{
        res.send(err )
    });
};
exports.updateTodos =(req,res)=>{
    db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})
    .then(todo=>{
        res.json(todo);
    }).catch(err=>{
        res.send(err)
    })
};
exports.deleteTodo=(req,res)=>{
    db.Todo.findByIdAndDelete({_id:req.params.todoId}).then(()=>{
        res.send('deleted!!')
    }).catch(err=>{
        res.send(err);
    });
};
module.exports =exports;