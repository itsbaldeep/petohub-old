// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Init express and mongoDB
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the database."))
  .catch(console.error);

// User routes
app.use("/api/user", require("./routes/user"));

// Product and Service routes
app.use("/api/product", require("./routes/product"));
app.use("/api/service", require("./routes/service"));

// Middlewares
app.use(require("./middleware/errorHandler"));

// Serving static frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Starting server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
