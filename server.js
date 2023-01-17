const express = require("express");
const app = express();
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use(express.json()); // read JSON BODY
app.use(express.urlencoded({ extended: true })); // read URL encoded body

const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://four537-lab2-backend.onrender.com",
      "https://tranquil-cascaron-ff53b1.netlify.app",
    ],
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/chatbot", (req, res) => {
  const message = req.body.message;
  const number = message.match(/\d+/);
  if (number) {
    fetch(`http://numbersapi.com/${number}?type=trivia`)
      .then((response) => response.text())
      .then((data) => {
        res.json({
          text: data,
        });
      })
      .catch((error) => {
        res.json({
          text: "Sorry, I couldn't find any information about that number.",
        });
      });
  } else {
    res.json({
      text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about.",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
