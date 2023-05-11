require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.on('error', (error) => {
    console.log("Database connection error:", error);
});

database.once('open', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());

const statesRouter = require('./routes/states');
app.use('/states', statesRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
