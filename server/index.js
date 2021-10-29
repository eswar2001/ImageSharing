const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log('Server started');
});
