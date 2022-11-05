import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {
    // console.log(todo)
    //setting useState to todo.description because we already have todo and we already have the info. We need to pass this because we want to edit what's already there. 
    const [description, setDescription] = useState(todo.description);

    //edit description function
    const updateDescription = async e=> {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch (`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            // console.log(response)
            //line 21 means once you edit, it will refresh the whole page to update 
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      
        {/*
            Changing the target and id so that when editing, the edits will target a different key. 
            # means target
            id = id10 for 21
        */}
      <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                &times;
              </button>
            </div>
            {/*
            onClick is setting the description back to it's original description
            */}

            <div class="modal-body"><input type='text' className="form-control" value={description} onChange={e => setDescription(e.target.value)}/></div>
            {/*
                need onChange so that you can actually edit the text in the form
            */}

            <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal"
            onClick = {e => updateDescription(e)}
            >
                Edit
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
