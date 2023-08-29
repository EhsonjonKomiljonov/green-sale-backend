import { app } from './app.js';
import './db/mongo.js';

const PORT = process.env.PORT;

app.listen(PORT, console.log('Server is run in port: ' + PORT));
