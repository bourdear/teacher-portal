const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001
const app = express()
const dataArr = JSON.parse(fs.readFileSync(path.resolve(__dirname, './database.json')))

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

app.get('/api', (req, res) => {
  res.json(dataArr)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})