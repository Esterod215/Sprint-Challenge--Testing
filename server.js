const express = require('express');

const server = express();

server.use(express.json());

const games =[
     {
         id:0,
         title: 'Pacman', 
         genre: 'Arcade', 
         releaseYear: 1980 
     },
     {
         id:1,
         title: 'Mario', 
         genre: 'action', 
         releaseYear: 1982  
     },

];

const students = [];

server.get('/api/games',(req,res)=>{
    res.status(200).json([games]);
});

server.get('/api/students',(req,res)=>{
    res.status(200).json([students]);
});

server.post('/api/games',(req,res)=>{
    const { id, title, genre } = req.body;
    
    if(!id || !title || !genre){
        res.status(422).json('Incomplete fields');
    }
    games.push(req.body);
    res.status(201).json([games]);
})






module.exports = server;