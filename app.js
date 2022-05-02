//calls in the 'inquirer' package  
const inquirer = require('inquirer')
//call in fs module
const fs = require('fs');
//calls in function from page-temp.js
const generatePage = require('./src/page-temp');

const promptUser = () => {

    
    return inquirer.prompt([
        { 
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input', 
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);

    if(!portfolioData.projects) {
        portfolioData.projects = [];
    };

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please describe your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Please enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to enter a project GitHub link!");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => { 
        const pageHTML = generatePage(portfolioData);
        const distDir = './dist';

        //makes the dist directory
        fs.mkdir(distDir, {recursive: true}, (err) => {
            if (err) throw err
        });

        //writes the HTML file inside dist directory
        fs.writeFile('./dist/index.html', pageHTML, err => {
          if (err) {
              console.log(err)
              return;
          }
          console.log('Page created! Check out index.html in this directory to see it!');

          //copies style sheet
          fs.copyFile('./src/style.css', './dist/style.css', err => {
              if (err) {
                  console.log(err);
                  return;
              }
              console.log('Style sheet copied successfully!');
          });
        });  

    }); 
  