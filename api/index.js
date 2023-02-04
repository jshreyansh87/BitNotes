const express = require('express')
const ConnectToDatabase = require('./DatabaseContext');

ConnectToDatabase();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`BitNotes listening at http://localhost:${port}`)
})
