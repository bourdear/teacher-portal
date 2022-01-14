const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001
const app = express()

// let options = {
//   setHeaders: function (res, path, stat) {
//     res.set('')
//   }
// }
// const dataArr = JSON.parse(fs.readFileSync(path.resolve(__dirname, './database.json')))

// const obj = {
//   "id": dataArr.length - 1, 
//   "name": 'Jesse Smith'
// }

// Push new object to dataArr
// dataObject.push(obj)


// fs.writeFile(__dirname + '/database.json', JSON.stringify(dataObject, null, 2), (err) => {
//   if (err) console.log(err)
//   console.log('File written successfully')
// })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  res.sendFile(path.join(__dirname, 'database.json'));
  next();
});

app.get("/api", (req, res) => {
  let data = JSON.parse(fs.readFileSync('./server/database.json', 'utf8'))
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})