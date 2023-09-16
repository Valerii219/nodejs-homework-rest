const app = require("./app");

const mongoose = require('mongoose');
const DB_HOST = 'mongodb+srv://Valerii21:Valerii21.@cluster0.ojkzz5m.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect()
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
