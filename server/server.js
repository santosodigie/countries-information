const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/country/:name', async (req, res) => {
    // store the entered value to a varaible called name
    const { name } = req.params;

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();
        // return 404 error if country is not found
        if (data.status == 404) {
            return res.status(404)
            .json({
                     message: "Country not found" 
                });
        }
        // sends the data 
        res.json(data);
    }
    catch (error) {
        res.status(500)
        .json({
            message: "Error loading data"
        })
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})