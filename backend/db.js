import mongoose from 'mongoose';
import { mongoUrl } from './config/config'

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
    console.log('Mongo connection established!');
});

mongoose.connection.on('reconnected', () => {
    console.log('Mongo connection reestablished');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection disconnected');
});

mongoose.connection.on('close', () => {
    console.log('Mongo connection closed');
});

mongoose.connection.on('error', (error) => {
    console.error(`Mongo connection error: ${error}`);
});

export const initMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gameOfDrones', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }

};