
$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos);

    $('#todoInput').keypress((event)=>{
        if(event.which == 13)
        {
            createTodos();
        }
    });
    $('.list').on('click','li',function(){
        updateLi($(this));
    });
    $('.list').on('click','span',function(e){
        e.stopPropagation(); 
        const todo = $(this).parent();
        removeTodo(todo);
    
    });


});
function removeTodo(todo){
    const ID = todo.data('id');
    const url = `/api/todos/${ID}`;
   
    $.ajax({
        method:'DELETE',
        url: url
    })
    .then(data=>{
        todo.remove();
    });
}
function addTodos (todo){
    todo.forEach(element => {

       displayATodo(element);
    });
}

function displayATodo(element){
    const newTodo = $(`<li class="task">${element.name} <span> X </span> </li>`);
    newTodo.data('id',element._id);
    newTodo.data('cm',element.completed);
    if(element.completed){
        newTodo.addClass('done')
    }
    $('.list').append(newTodo)
}

function createTodos(){
    const userInput = $('#todoInput').val();
    $.post('/api/todos',{name:userInput})
    .then((newtodo)=>{
        $('#todoInput').val('');
        displayATodo(newtodo);
    }).catch(err=>{
        console.log(err);
    })
}
function updateLi(li){
    const ID1 = li.data('id');
    const url1 = `/api/todos/${ID1}`;
    const isDone = !li.data('cm');
    const upData = {completed:isDone};
    $.ajax({
        method:'PUT',
        url:url1,  
        data:upData
    }).then(updated =>{
        li.toggleClass("done");
        li.data('cm',isDone);
    }).catch(err=>{
        console.log(err)
    });
}