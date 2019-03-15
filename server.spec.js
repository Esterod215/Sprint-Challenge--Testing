const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    
    describe('Test Get /api/games', () => {
        
        it('should return a status of 200', () => {
            const res = request(server).get('/api/games');
            expect(res.status).toBe(200);
        });
    });
});