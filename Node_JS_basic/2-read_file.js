// read sync file
function countStudents(path) {
const content = fstat.readFileSync(path, 'utf8');
const lines = content.split('\n').filter((line) => line.trim() !=='');
const records = lines.slice(1);
const studentsByField = {};
records.forEach((line) => {
    // , , saute lastname et age
    const [firstname, , , field] = line.split(',');
    if (!studentsByField[field]) studentsByField[field] = []; 
    studentsByField[field].push(firstname);
});
console.log(`Number of students: ${records.length}`);
console.log(`Number of students in ${field}: ${studentsByField[field].length}.list: ${studentsByField[field].join(', ')}`
)};
