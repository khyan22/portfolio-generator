//call in fs module
const fs = require('fs')

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if theres an error, reject the Promise and send the error to the Promise's .catch() method
            if (err) {
                reject(err)
                console.log('Error')
                //returns out of the function() to stop the promise from executing the resolve()
                return
            }

            //if no err, resolve the promise and send the data to the .then() method
            resolve({
                ok: true,
                message: 'File Created!'
            })
        })
    })
}

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err)
                return
            }
            
            resolve({
                ok: true, 
                message: 'File Copied!'
            })
        })
    })
}

const distDir = () => {
    fs.mkdir('./dist', {recursive: true}, (err) => {
        if (err) {
            throw err
        }
    })
}

module.exports = {writeFile, copyFile, distDir}