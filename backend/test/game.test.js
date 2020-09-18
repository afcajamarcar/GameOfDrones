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
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) console.error(err);
                const body = res.body;
                assert.exists(body.game, 'game is neither null nor undefined');
                assert.exists(body.game.playerOne, 'playerOne is neither null nor undefined');
                assert.exists(body.game.playerTwo, 'playerTwo is neither null nor undefined');
                assert.strictEqual(
                    players.playerOne, 
                    body.game.playerOne.name, 
                    'The returned playerOne name should be equal to the given name'
                );
                assert.strictEqual(
                    players.playerTwo, 
                    body.game.playerTwo.name, 
                    'The returned playerOne name should be equal to the given name'
                );
                assert.exists(body.game.playerOne.victory, 'victory boolean of playerOne is neither null nor undefined');
                assert.exists(body.game.playerTwo.victory, 'victory boolean of playerTwo is neither null nor undefined');
                assert.exists(body.game.playerTwo.victory, 'victory boolean of playerTwo is neither null nor undefined');
                assert.exists(body.game.id, 'game id is neither null nor undefined');
                assert.strictEqual(mongoDbIdLength, body.game.id.length);
            });
        });
    });
});