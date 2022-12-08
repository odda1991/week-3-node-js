const express = require("express");

require("dotenv").config()
const bcrypt = require("bcrypt")
const authorize = require("./middleware/authorize.js")
const genertedJwt = require("./utils/jwt.js")
const app = express()
app.use(express.json())
const users = [];

app.get("/", function(req, res){
    console.log(process.env)
    res.send("hello world")
})

app.post("/users/sign-up",async function(req, res){
    const {email, name , password} = req.body

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    const userId = users.length
    const newUser = {
        id: userId,
        email: email,
        password: encryptedPassword,
        name: name
    }
    users.push(newUser)
    

    res.send({jwtToken: genertedJwt(userId), isAuthenticated: true})
})


app.post("/users/sign-in", async function(req, res){
    const {email , password} = req.body

    const foundUser = users.find(function(user){
        return user.email == email
    })

    if(foundUser == undefined){
        return res.status(401).json({error: "Ivalid Credential", isAuthenticated: false})
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password)
    if(isPasswordValid == false){
        return res.status(401).json({error: "Ivalid Credential", isAuthenticated: false})
    }

    res.send({jwtToken: genertedJwt(userId), isAuthenticated: true})
})

app.get("/quotes", authorize , function(req, res){
    res.send("hello")
})

 
const port = process.env.PORT

app.listen(port, function(){
    console.log("server is running on " + port)
})