const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const md5 = require('md5');
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log('Server started');
});

app.get('/', (req, res) => {
    res.send('GET');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('Image Recieved');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    res.status(200).send(`http://localhost:8000/${md5(name).slice(0, 6)}`);
});

app.get('/find/:string/', (req, res) => {
    res.send(`Found something at ${req.path}`);
})
// http://localhost:8000/
// npm i --save express cors nodemon 