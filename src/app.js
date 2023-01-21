const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jose Paitamala'
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jose Paitamala'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jose Paitamala',
        helpful: 'This is some helpful text'
    })
});

app.get('/team', (req,res) => {
    res.send([
        {
            name: 'Jose',
            job: 'Front End Developer',
            age: 39
        },
        {
            name: 'Filip',
            job: 'Back End Developer',
            age: 38
        }
    ]);
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if ( error ) {
            return res.send({
                error: error
            });
        }
      
        forecast(latitude, longitude, (error, dataForecast) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                address: req.query.address,
                location: location,
                forecast: dataForecast
            });
        })
        
    });

    
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help Article not found',
        name: 'Jose Paitamala',
        errorMessage: 'Please try another page'
    })
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404: Page not found',
        name: 'Jose Paitamala',
        errorMessage: 'Please try another page'
    })
});

app.listen(port, () => {
    console.log('Server is on port 3000, go to http://localhost:3000/');
});