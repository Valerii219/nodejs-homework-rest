const app = require("./app");

const mongoose = require('mongoose')

const DB_HOST = 'mongodb+srv://Valerii21:Valerii21.@cluster0.ojkzz5m.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
.then(()=>{
  app.listen(3000)
  console.log("Database connection successful");
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

