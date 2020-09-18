import { server } from '../index';

import 'regenerator-runtime/runtime.js'; // Crucial import to mock async functions in test env

import request from 'supertest';

import chai from 'chai';
const assert = chai.assert;

// Mock data
const players = { playerOne: 'Tyrion Lannister', playerTwo: 'Cersei Lannister' };
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
                    console.log('Response from game creation', body);
                    assert.exists(body._id, 'game id is neither null nor undefined');
                    assert.strictEqual(mongoDbIdLength, body._id.length);
                    assert.exists(body.playerOne, 'playerOne is neither null nor undefined');
                    assert.exists(body.playerTwo, 'playerTwo is neither null nor undefined');
                    assert.typeOf(body.playerOne, 'string', 'playerOne whould contain the name of the player');
                    assert.typeOf(body.playerTwo, 'string', 'playerTwo whould contain the name of the player');
                    assert.strictEqual(
                        players.playerOne,
                        body.playerOne,
                        'The returned playerOne name should be equal to the given name'
                    );
                    assert.strictEqual(
                        players.playerTwo,
                        body.playerTwo,
                        'The returned playerOne name should be equal to the given name'
                    );
                    assert.exists(body.rounds, 'rounds is neither null nor undefined');
                    assert.typeOf(body.rounds, 'array', 'rounds must be represented as an array');
                    assert.exists(body.winner, 'winner should be a part of a game');
                    assert.typeOf(body.winner, 'string', 'winner should be a string');
                });
        });
    });
    it('Creates a game and mocks a victory', () => {
        request(server)
            .post('/api/create_game')
            .send(players)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const body = res.body;
                console.log('game creation before any moves', body)
                request(server)
                    .post('/api/make_move')
                    .send({
                        gameId: body._id,
                        playerOne: 1,
                        playerTwo: 2
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(res => {
                        const body = res.body;
                        console.log('Response from move made', body);
                        assert.exists(body._id, 'game id is neither null nor undefined');
                        assert.exists(body.playerOne, 'playerOne is neither null nor undefined');
                        assert.exists(body.playerTwo, 'playerTwo is neither null nor undefined');
                        assert.exists(body.rounds, 'rounds is neither null nor undefined');
                        assert.exists(body.winner, 'winner should be a part of a game');
                        assert.equal(1, body.rounds[0], 'playerOne should have won the first round')
                        request(server)
                            .post('/api/make_move')
                            .send({
                                gameId: body._id,
                                playerOne: 1,
                                playerTwo: 2
                            })
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then(res => {
                                const body = res.body;
                                console.log('Response from move made', body);
                                assert.equal(1, body.rounds[1], 'playerOne should have won the second round');
                                request(server)
                                    .post('/api/make_move')
                                    .send({
                                        gameId: body._id,
                                        playerOne: 1,
                                        playerTwo: 2
                                    })
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end((err, res) => {
                                        if (err) console.error(err);
                                        const body = res.body;
                                        console.log('Response from move made', body);
                                        assert.equal(1, body.rounds[1], 'playerOne should have won the thid round');
                                        assert.equal(body.winner, body.playerOne, 'playerOne should have won the match');
                                    });
                            });
                    });
            });
    });
});