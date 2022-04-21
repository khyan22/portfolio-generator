const fs = require('fs');
const generatePage = require('./src/page-temp.js');

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [fullName, github] = profileDataArgs;

fs.writeFile('index.html', generatePage(fullName, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});