const express = require("express");

require("dotenv").config()

const app = express()

app.get("/", function(req, res){
    console.log(process.env)
    res.send("hello world")
})

const port = process.env.PORT

app.listen(port, function(){
    console.log("server is running on " + port)
})