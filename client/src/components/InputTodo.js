import React, {Fragment, useState} from 'react';

//adds data into the table 

const InputTodo = () => {
    //description is state. setDescription is the only way to change the state
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        //preventDefault prevents event from refreshing
        e.preventDefault();
        try {
            const body = {description};
            //by default, fetch create a get request
            // always need to await a fetch request because it's a promise.
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        //mt-5 means margin top 5
        //onChange makes it possible to type in the input. Without it, there's nothing that "changes"
        //onSubmit will be triggered when onSubmit happens on form
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;