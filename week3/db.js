const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test_db")
.then(() => console.log("Connected Successfully"))
.catch(err => console.log(err));
