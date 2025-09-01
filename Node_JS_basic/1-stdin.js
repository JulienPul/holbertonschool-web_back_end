//  Using Process stdin
process.stdout.write(`Welcome to Holberton School, what is your name?`);
process.stdin.on('data', (data) => {
  const name = data.toString();
  process.stdout.write(`Your name is: ${name}\n`);
});
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
