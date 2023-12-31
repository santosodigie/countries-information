const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001; // setting port variable to use the port assigned by hosting enviroment, otherwise use port 3001


app.use(cors({
    origin: ["https://countries-information-hv4xsantos.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi Welcome to Santos Odigies Express Server');
  });
  

// endpoint to retrieve all countries
app.get('/countries', async (req, res) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const countries = await response.json();
        res.json(countries);
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json(
            { 
                message: "Error retrieving countries data" 
            });
    }
});

app.get('/country/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

        if (!response.ok) { 
            if (response.status === 404) {
                return res.status(404).json({
                    message: "Country not found" 
                });
            } else {
                throw new Error('Non-200 response');
            }
        }

        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: "Error loading data"
        });
    }
});


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });
}

module.exports = app