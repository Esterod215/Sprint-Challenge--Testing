const request = require('supertest');
const server = require('./server.js');
const { games } = require('./server');

describe('server.js', () => {
    // afterEach(async () => {
    //     await games.truncate();
    //   });
    
    describe('Test Get /api/games', () => {
        
        it('should return a status of 200', async () => {
            const res = await request(server).get('/api/games');
            expect(res.status).toBe(200);
        });

        
        it('should return an empty array when there is no data', async () => {
            const res = await request(server).get('/api/students')
            expect(res.body).toEqual([[]]);
        })
        
        it('should return data provided', async () => {
            const res = await request(server).get('/api/games')
            expect(res.body).toEqual([[
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
            
            ]])
        })
    });

    describe('Post /api/games', () => {
        
        it('should return status code 422 if incomplete body is sent', async () => {
            let body = {genre:'action'};
            const res = await request(server).post('/api/games').send(body)
            expect(res.status).toBe(422);
            expect(res.body).toBe('Incomplete fields');
        });

        it('should return a status code of 201', async () => {
             const body = {id:2, title:'Legend of Zelda', genre:'puzzle/adventure'};
             const res = await request(server).post('/api/games').send(body)
             expect(res.status).toBe(201);
        });

        it('should contain the newly added data', async () => {
            const body = {id:6, title:'Donkey Kong', genre:'arcade',releaseYear:'1980'};
            const res = await request(server).post('/api/games').send(body);
            console.log('response body:' ,res.body)
            expect(res.body).toEqual([[{"genre": "Arcade", "id": 0, "releaseYear": 1980, "title": "Pacman"}, {"genre": "action", "id": 1, "releaseYear": 1982, "title": "Mario"}, {"genre": "action"}, {"genre": "puzzle/adventure", "id": 2, "title": "Legend of Zelda"}, {"genre": "arcade", "id": 6, "releaseYear": "1980", "title": "Donkey Kong"}]]);
        })

    });
});