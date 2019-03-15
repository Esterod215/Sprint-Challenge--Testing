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
});