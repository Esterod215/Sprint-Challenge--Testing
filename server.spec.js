const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    
    describe('Test Get /api/games', () => {
        
        it('should return a status of 200', async () => {
            const res = request(server).get('/api/games');
            expect(res.status).toBe(200);
        });

        it('should return an empty array when there is no data', async () => {
            const res = request.server.get('/api/games')
            expect(res.body).toEqual([]);
        })
        
        it('should return data provided', async () => {
            const res = await request(server).get('/api/games')
            expect(res.body).toEqual([
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
            
            ])
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
             expect(res.body).toEqual([
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
                {
                    id:2,
                    title:'Legend of Zelda',
                    genre:'puzzle/adventure',
                }
            
            ]) 
        })
    })
});