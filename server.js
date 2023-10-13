const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//API GET method
app.get('/api/quotes/random', (req, res, next) => {
    res.send({quote: getRandomElement(quotes)});
    next();
});

//API GET /api/quotes route
app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const personQuotes = quotes.filter(quote => quote.person === req.query.person);
        res.send({quotes: personQuotes});
    }
});

//API POST /api/quotes route
app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        quotes.push({quote: req.query.quote, person: req.query.person});
        res.send({quote: {quote: req.query.quote, person: req.query.person}});
    } else {
        res.status(400).send();
    }
    next();    
});