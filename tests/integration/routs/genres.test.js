const request = require('supertest'); // gives a function
const { Geners } = require('../../../models/gener');
const { User } = require('../../../models/user');

let server;

describe('/api/geners', () => {
    //we need to start and close the server after each integration test so we need to start and close before and after as well.
    // there is a function which is proovided by Jest
    beforeEach( () => {server = require('../../../index')} );
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

        // Define the happy Path, and then in each test, we change
        // one parameter that clearly aligns with the name of the tes.

        let token;
        let name;
        const exec = async () => {
            return await request(server)
            .post('/api/geners')
            .set('x-auth-token', token)
            .send({ name }); // if value and key is same then we can use one
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'geners1';
        });

        it('shoud return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();

            expect(res.status).toBe(401);

        });

        it('shoud return 400 if client is less than 5 Character', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400); 
        });

        it('shoud return 400 if client name is more than 5 Character', async () => {
            name = new Array(52).join('a');

            const res = await exec();
            expect(res.status).toBe(400); 
        });

        it('shoud save the geners if it is valid', async () => {

            await exec();
            const gener = await Geners.find({ name: 'geners1'});
            expect(gener).not.toBeNull();
        });

        it('shoud return the geners if it is valid', async () => {

            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'geners1');
        });
    });
});