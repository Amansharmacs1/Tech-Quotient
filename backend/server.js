import express from "express";

let app=express();

const PORT=5001;

app.listen("/",(req,res)=>{
    console.log(`Server is Listening on Port ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send("Server is running");
})