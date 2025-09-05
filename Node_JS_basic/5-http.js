// Create a more complex HTTP server using Node's HTTP module
const http = require('http');
const fs = require('fs');

function readStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((l) => l.trim() !== '');
      // enlever l'entête
      if (lines.length === 0) { resolve({ total: 0, byField: {} }); return; }
      lines.shift();

      const byField = {};
      let total = 0;

      for (let i = 0; i < lines.length; i += 1) {
        const parts = lines[i].split(',');
        const firstname = parts[0];
        const field = parts[3];
        if (firstname && field) {
          if (!byField[field]) byField[field] = [];
          byField[field].push(firstname);
          total += 1;
        }
      }
      resolve({ total, byField });
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');

    const db = process.argv[2]; // CSV passé en argument
    if (!db) {
      res.end('Cannot load the database');
      return;
    }

    readStudents(db)
      .then(({ total, byField }) => {
        res.write(`Number of students: ${total}\n`);

        // on affiche les fields triées
        const fields = Object.keys(byField).sort();
        fields.forEach((field, idx) => {
          const list = byField[field];
          const line = `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
          // pas de \n après la dernière ligne
          if (idx < fields.length - 1) res.write(`${line}\n`);
          else res.write(line);
        });

        res.end();
      })
      .catch(() => {
        res.end('Cannot load the database');
      });
  }
});

app.listen(1245);

module.exports = app;
