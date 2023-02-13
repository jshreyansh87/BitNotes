const express = require('express')
const ConnectToDatabase = require('./DatabaseContext');
const cors = require('cors');

ConnectToDatabase();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/notes', require('./Routes/Notes'));

app.listen(port, () => {
  console.log(`BitNotes listening at http://localhost:${port}`)
})
