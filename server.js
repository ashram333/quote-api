const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (_, res) => {
  res.send({quote:getRandomElement(quotes)})
})

app.get('/api/quotes', (req, res) => {
  if(req.query.person) {
      res.send({quotes:quotes.filter(x => x.person === req.query.person)})
  } else {
      res.send({quotes})
  }
})

app.post('/api/quotes', (req, res, next) => {
  const quote = req.query.quote
  const person = req.query.person
  if(quote && person) {
      quotes.push({quote, person})
      res.send({quote:{quote, person}})
  } else {
      res.sendStatus(400)
  }
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});