const express = require('express');

const server = express();

server.use(express.json());

const games = [
    {
        id:0,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        id:1,
        title: 'Mario', // required
        genre: 'action', // required
        releaseYear: 1982  
    },

];

server.get('/api/games',(req,res)=>{
    res.status(200).json(games);
});

server.post('/api/games',(req,res)=>{
    const { id, title, genre } = req.body;
    
    if(!id || !title || !genre){
        res.status(422).json('Incomplete fields');
    }
    
    res.status(201).json([games]);
})

server.listen('localhost:3000',()=>{
    console.log('server listening on port 3000');
});




module.exports = server;