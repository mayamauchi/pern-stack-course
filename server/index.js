const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
//any time you use middleware, you have to use app.use
app.use(cors());
//gives us access to req.body from json data
app.use(express.json()); //req.body

//ROUTES//

//create a todo
//post because we're adding data
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
        //description is column
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
      //description is going to be in the value $1
      //returning means returning back the data
    );
    res.json(newTodo.rows[0]);
    //has to be res.json rows because that's where the data is located at
  } catch (error) {
    console.error(err.message);
  }
});

//get all todos
//will get all the todos that's in our array of objects
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//get a todo
//:id is the key of an object. So, if in the url, you put in todos/random, the object, {id: 'random'} will show up.
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //where clause helps get the specific data. In this case, an id. If you do todos/3, it'll pull up the object with the id = 3.
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body; 
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json('Todo was updated!');
    } catch (error) {
        console.error(err.message)
    }
})

//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const{id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (error) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
