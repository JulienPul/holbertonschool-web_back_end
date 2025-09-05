// Reading a file synchronously with Node JS
const fs = require('fs');

function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    const lines = content.split('\n').filter((line) => line.trim() !== '');

    // retirer l'entête
    lines.shift();

    const studentsByField = {};
    let total = 0;

    for (let i = 0; i < lines.length; i += 1) {
      const parts = lines[i].split(',');
      const firstname = parts[0];
      const field = parts[3];

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstname);
      total += 1;
    }

    console.log(`Number of students: ${total}`);
    Object.keys(studentsByField).sort().forEach((field) => {
      const list = studentsByField[field];
      console.log(
        `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`,
      );
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
