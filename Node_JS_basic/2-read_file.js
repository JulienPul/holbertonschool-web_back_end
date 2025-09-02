// read sync file
const fs = require('fs');

function countStudents(path) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    const lines = content.split('\n').filter((line) => line.trim() !== '');
    const records = lines.slice(1); // enlève l’en-tête

    const studentsByField = {};
    records.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!studentsByField[field]) studentsByField[field] = [];
      studentsByField[field].push(firstname);
    });

    console.log(`Number of students: ${records.length}`);
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        console.log(
          `Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`
        );
      }
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
