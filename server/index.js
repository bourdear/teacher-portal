const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Credentials', true);  
  res.sendFile(path.join(__dirname, 'database.json'));
  next();
});

app.get("/api", (req, res) => {
  let data = JSON.parse(fs.readFileSync('./server/database.json', 'utf8'))
  })

app.put("/api", (req, res) => {
  fs.writeFile('./server/database.json', JSON.stringify(req.body.apiData, null, 2), (err) => {
    if (err) console.log(err);
  });
  console.log('File written')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})