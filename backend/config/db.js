import mongoose from 'mongoose';
import { mongoUrl } from './config'

mongoose.Promise = Promise;

// Must set property to false according to https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false);

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
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }

};