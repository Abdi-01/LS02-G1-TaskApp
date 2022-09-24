require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { dbQuery, dbConfig } = require("./config/database")

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors())
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.post("/api/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    await dbQuery(`INSERT INTO users (email, password) VALUES 
    (${dbConfig.escape(email)},${dbConfig.escape(password)});`)

    let user = await dbQuery(`
      SELECT * FROM users u WHERE u.email = ${dbConfig.escape(email)}
      AND u.password = ${dbConfig.escape(password)};`
    );

    user.length > 0 ? res.status(200).send({ success: true, email }) : res.status(400).send({ success: false })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false })
  }
})

app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await dbQuery(`
      SELECT * FROM users u WHERE u.email = ${dbConfig.escape(email)}
      AND u.password = ${dbConfig.escape(password)};`
    );

    user.length > 0 ? res.status(200).send({ success: true }) : res.status(400).send({ success: false })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false })
  }
})

app.get("/api/task/all_task", async (req, res) => {
  try {
    let task = await dbQuery(` SELECT * from tasks WHERE user_id = 1 `);
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send({ success: false })
  }
});

app.post("/api/task/add_task", async (req, res) => {
  try {
    const {task, category} = req.body

    let addTask = await dbQuery(`INSERT INTO tasks (user_id, task, category) VALUES (1, ${dbConfig.escape(task)}, ${dbConfig.escape(category)})`);

    res.status(200).send({ success: true }) 
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false })
  }
})

app.patch("/api/task/update_task", async (req, res) => {
  try {
    const {idTask, newTask} = req.body 

    const updateTask = await dbQuery(`UPDATE tasks SET Category = ${dbConfig.escape(newTask)} WHERE idtask = ${dbConfig.escape(idTask)};`)

    res.status(200).send({
      success: true,
      massage: 'Data Updated'
    })

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})


app.get("/api", (req, res) => {
  res.status(200).send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
