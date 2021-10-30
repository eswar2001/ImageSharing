const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const md5 = require('md5');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 8000;
const { MONGODBURI, CLOUDINARY_URL } = require('./keys.js');
const ImageDataUri = require('image-data-uri');
const app = express();
cloudinary.config({
    cloud_name: 'dccyvmp29',
    api_key: '238846339845589',
    api_secret: 'uCN4kGZYhf4hQE4sMN76W7CZpOc'
});
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
const ImageObj = mongoose.model('ImageObj');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/find/:string', (req, res) => {
    const hash = req.params.string;
    console.log(req.body);
    ImageObj.findOne({ hash }, (err, data) => {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.jsonp(data);
        }
    })
});

app.get('/', (req, res) => {
    ImageObj.find((err, obj) => {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(obj);
        }
    });
});

app.post('/create', (req, res) => {
    const { name, dataUri } = req.body;
    // console.log(name);
    ImageDataUri.outputFile(dataUri, name)
        .then((response) => {
            cloudinary.v2.uploader.upload(`${name}`, function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    let hash = md5(`${result.public_id}${Date.now()}${name}`).slice(0, 6);
                    let obj = ImageObj({
                        name, url: result.url, hash
                    });
                    obj.save().then(() => {
                        res.json({ result, hash });
                    }).catch((err) => {
                        console.log(err);
                        res.send(err);
                    });
                }
            });
            fs.unlink(name, (err) => {
                if (err) {
                    console.log('not deleted');
                }
                console.log('file was deleted');
            });
        }).catch((err) => {
            console.error(err);
            res.send(err);
        });

});

app.listen(PORT, () => {
    console.log('Server started');
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    })
});