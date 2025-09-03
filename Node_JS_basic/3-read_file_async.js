// Reading a file asynchronously with Node JS
const { error } = require('console');
const fs =require('fs');
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      lines.shift();

      const studentsByField = {};
      let total = 0;
      for(let i = 0; i < lines.length; i++) {
        const parts = lines[i].split(',');
        const firstname = parts[0];
        const field = parts[3];
        if (!studentsByField[field]) {
            studentsByField[field] = [];   
        }
        studentsByField[field].push(firstname);
        total++;
      }
      console.log(`Number of students: ${total}`);
      Object.keys(studentsByField).sort().forEach((field) => {
        const list = studentsByField[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      });
      resolve();
    });
  });

}
module.exports = countStudents;