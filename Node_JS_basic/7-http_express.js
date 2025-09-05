// Create a more complex HTTP server using Express
const express = require('express');

const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});
app.get('/students', (req, res) => {
  res.send('This is the list of our students');
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
});

app.listen(1245);

module.exports = app;
