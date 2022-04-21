const generatePage = (fullName, github) => {
    
    return `
    <DOCTYPE hmtl>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>


    <body>
        <h1>${fullName}</h1>

        <h2>
            <a href="https://github.com/${github}" target="_blank">Github</a>
        </h2>
    </body>
    </html>
    `;
};

module.exports = generatePage;