const express = require("express");

const app = express();
app.use(express.json());
const fs = require("fs");

// const users = [{ id: 1, name: "Naraa", age: 20 }];
// / gants taashu zuraasn localhost 8000 zaaj bgaa
app.get("/", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  res.status(200).json({ users: users });
});

app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  res.status(201).json({ user: newUser });
});

app.put("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findIndex > -1) {
    users[findIndex].age = req.body.age;

    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findIndex > -1) {
    const deleteUser = users.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deleteUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("server is running at localhost:8000 ");
});
