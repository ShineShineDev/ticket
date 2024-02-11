import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import routes from './routes';
const cors = require('cors');
import path from 'path';  // Import the 'path' module


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

createConnection()
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Connectiong to mongodb SANDBOX ....`);
});
