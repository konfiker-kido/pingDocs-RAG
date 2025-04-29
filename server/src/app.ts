import express from 'express';
import cors from 'cors';
import{ Redis} from 'ioredis'

import router from './Router/HandlePdf';

export const connection = new Redis({
    host: 'localhost', // or use 'host.docker.internal' if you're running the app outside of Docker
    port: 6380,        // Ensure this is the correct port for your Redis instance
    maxRetriesPerRequest: null,  
});


const app = express();
app.use(cors());

app.use('/api', router);




app.listen(8000, ()=> console.log(`Server is up and running 🚀`));  