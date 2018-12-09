const request = require('supertest'); // gives a function
const { Geners } = require('../../models/gener');
const { User } = require('../../models/user');

let server;

describe('/api/geners', () => {
    //we need to start and close the server after each integration test so we need to start and close before and after as well.
    // there is a function which is proovided by Jest
    beforeEach( () => {server = require('../../index')} );
    // to close
    afterEach( async () => {
        server.close();
        await Geners.remove({}); // cleanup our database
    });

    describe('GET /', () => {
        it('should returns all genres', async () => {
            await Geners.collection.insertMany([
                { name: 'geners1' },
                { name: 'geners2' },
            ]);
            const res = await request(server).get('/api/geners');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);

            expect(res.body.some( g => g.name === 'geners1' )).toBeTruthy();
            expect(res.body.some( g => g.name === 'geners2' )).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a gener if valid id is passed', async () => {
            const gener = new Geners({ name: 'geners1' });
            await gener.save();

            const res = await request(server).get('/api/geners/' + gener._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', gener.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/geners/1');
            expect(res.status).toBe(404);
            // expect(res.body).toHaveProperty('name', gener.name);
        });
    });

    describe('POST /', () => {
        it('shoud return 401 if client is not logged in', async () => {
            const res = await request(server)
                            .post('/api/geners')
                            .send({ name: 'geners1' });
            expect(res.status).toBe(401);

        });

        it('shoud return 400 if client is less than 5 Character', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                            .post('/api/geners')
                            .set('x-auth-token', token)
                            .send({ name: '1234' });
            expect(res.status).toBe(400); 
        });

        it('shoud return 400 if client name is more than 5 Character', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(52).join('a');

            const res = await request(server)
                            .post('/api/geners')
                            .set('x-auth-token', token)
                            .send({ name: name });
            expect(res.status).toBe(400); 
        });

        it('shoud save the geners if it is valid', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(52).join('a');

            const res = await request(server)
                            .post('/api/geners')
                            .set('x-auth-token', token)
                            .send({ name: 'geners1' });
            const gener = await Geners.find({ name: 'geners1'});
            expect(gener).not.toBeNull();
        });

        it('shoud return the geners if it is valid', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(52).join('a');

            const res = await request(server)
                            .post('/api/geners')
                            .set('x-auth-token', token)
                            .send({ name: 'geners1' });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'geners1');
        });
    });
});