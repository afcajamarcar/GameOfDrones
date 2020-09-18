import { server } from '../index';

import 'regenerator-runtime/runtime.js'; // Crucial import to mock async functions in test env

import request from 'supertest';

import chai from 'chai';
const assert = chai.assert;

// Mock data
const players = {playerOne: 'Tyrion Lannister', playerTwo: 'Cersei Lannister'};
const mongoDbIdLength = 24;

describe('Game of Drones game test suite', () => {
    describe('Init game', () => {
        it('Creates and persists a new Game entitity', () => {
            request(server)
            .post('/api/create_game')
            .send(players)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) console.error(err);
                const body = res.body;
                console.log('body', body);
                assert.exists(body.playerOne, 'playerOne is neither null nor undefined');
                assert.exists(body.playerTwo, 'playerTwo is neither null nor undefined');
                assert.strictEqual(
                    players.playerOne, 
                    body.playerOne.name, 
                    'The returned playerOne name should be equal to the given name'
                );
                assert.strictEqual(
                    players.playerTwo, 
                    body.playerTwo.name, 
                    'The returned playerOne name should be equal to the given name'
                );
                assert.exists(body.playerOne.victory, 'victory boolean of playerOne is neither null nor undefined');
                assert.exists(body.playerTwo.victory, 'victory boolean of playerTwo is neither null nor undefined');
                assert.exists(body.playerTwo.victory, 'victory boolean of playerTwo is neither null nor undefined');
                assert.exists(body._id, 'game id is neither null nor undefined');
                assert.strictEqual(mongoDbIdLength, body._id.length);
            });
        });
    });
});