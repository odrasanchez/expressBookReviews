const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username: "admin", password: "password123" },
{ username: "newuser", password: "newpassword123" }
];

const isValid = (username) => {
  return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => { //returns boolean
  const user = users.find(user => user.username === username);
  if (user && user.password === password) {
    return true;
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  if (!user || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(user, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, user
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
