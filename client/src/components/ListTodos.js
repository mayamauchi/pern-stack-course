import React, {Fragment, useEffect, useState} from 'react';
//useEffect will do a fetch request to the API every time this component is rendered
import EditTodo from './EditTodo';

const ListTodos= () => {

    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async id => {
        //using template literals = allows you to put variables within strings
        //passing in id in template literal because we're targeting id's to delete
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            // console.log(deleteTodo)
            //filter sets the condition. In this case, if the condition is met, it will return only those that are qualified
            //if todo.todo_id is not equal to that id, then return those. 
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch ("http://localhost:5000/todos")
            const jsonData = await response.json();
            //have to parse first to get json data
            //using setTodos because that's the only way to change the state
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}
      {todos.map(todo => (
        //todo_id is what makes each data unique
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
            
        </tr>
        //have to specify what to delete so passing in todo.todo_id
        //{todo} is now a prop in 63
      ))}
    
    </tbody>
  </table>
        </Fragment>
    )
}

export default ListTodos;