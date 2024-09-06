import express from "express";
import { read } from "../index.js";
import cors from 'cors'
var app = express();
app.use(cors())

app.get("/",async function (req, res) {
 try{
    res.setHeader("Content-Type", "application/json");

    const exemple = await read();
    res.send(exemple);
 }catch(e){
    console.log(e);
    
 }
});

app.listen(3000);
