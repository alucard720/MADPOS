const express = require('express');
require('./models/config');
// require("dotenv").config();
const User = require('./models/User');
const Product = require('./models/Product');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())








app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send({message:'Error getting products',error});
    }
});


//start server
// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log('Server connection Established');
});

