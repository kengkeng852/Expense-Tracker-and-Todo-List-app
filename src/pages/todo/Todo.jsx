import "./todo.css";
import React, { useState, useEffect } from 'react';

const Todo = () => { 
    const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []); //from start if have data in localStorage already then it can be call it and put it into todos variable
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(-99);

    useEffect(() => { // in initial it will load todo list from localStorage if it exists
        const storedTodo = JSON.parse(localStorage.getItem('todos'));
        if (storedTodo) {
            setTodos(storedTodo);
        }
    }, []);

    //save todo list
    useEffect(() => { //run when it changes to save todo list to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); //this [todos] it show that is useEffect depend on todos

    const handleTodoSubmit = (e) => {
        e.preventDefault();
        const updatedTodos = editTodoId >= 0 ? //if user want  to edit todo 
        todos.map((todo, index) => 
            index === editTodoId ? {value: newTodo, checked: todo.checked }: todo
        ) 
        : [...todos, {value: newTodo, checked: false}];

        setTodos(updatedTodos);
        setNewTodo('');
        setEditTodoId(-99); //reset edit mode
    }

    const checkTodo = (index) => {
        setTodos(
          todos.map((todo, todoIndex) =>
            todoIndex === index ? { ...todo, checked: !todo.checked } : todo
          )
        );
      };
    
      const deleteTodo = (index) => {
        setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
      };
    
      const editTodo = (index) => {
        setNewTodo(todos[index].value);
        setEditTodoId(index);
      };
    
      const renderTodos = () => {
        if (todos.length === 0) {
          return <h2>Nothing to do!</h2>;
        }
    
        return todos.map((todo, index) => (
          <div className="todo" id={index} key={index}>
            <i
              className={`bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}`}
              onClick={() => checkTodo(index)}
              data-action="tocheck"
            ></i>
            <p className={todo.checked ? 'checked' : ''}>{todo.value}</p>
            <i className="bi bi-pencil-square" onClick={() => editTodo(index)} data-action="toedit"></i>
            <i className="bi bi-trash" onClick={() => deleteTodo(index)} data-action="todelete"></i>
          </div>
        ));
      };

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="container">
                <section className="todobox" id="todobox">
                    <div className="head">
                        <div className="header">
                            <h2>To Do List</h2>
                        </div>
                        <div className="newtodo">
                            <form id="todoform" onSubmit={handleTodoSubmit}>
                                <input type="text" name="newtodoinput" id="newtodoinput" placeholder="Keng have to do ....." 
                                value={newTodo} onChange={(event) => setNewTodo(event.target.value)}/>
                                <button type="submit">
                                    <i className="bi bi-plus-circle-dotted"></i>
                                </button>                       
                            </form>
                        </div>
                    </div>
                    <div id="todolist">
                        {renderTodos()}
                    </div>
                </section>
            </div>    
        </div>
    );
}

export default Todo;