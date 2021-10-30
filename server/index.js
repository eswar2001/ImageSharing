const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const md5 = require('md5');
const cloudinary = require('cloudinary').v2;
const PORT = process.env.PORT || 8000;
const { MONGODBURI, CLOUDINARY_URL } = require('./keys.js');
const ImageDataUri = require('image-data-uri');
const app = express();
cloudinary.config(CLOUDINARY_URL);
mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const objectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    }
});
mongoose.model('ImageObj', objectSchema);

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log('Server started');
});


app.post('/create', (req, res) => {
    const { name, dataUri } = req.body;
    // ImageDataUri.
    cloudinary.uploader.upload("my_image.jpg", function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {

            res.status(200).send(result);
        }
    });

});

var i = 0;
app.get('/', (req, res) => {
    res.send(`${i++}`);
});