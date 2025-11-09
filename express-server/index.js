const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.get('/contact', (req, res) => {
  res.end('Hello World! contact');
});
app.post('/tweet', (req, res) => {
  res.status(201).end('Hello World! contact');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 