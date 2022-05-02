const generateAbout = aboutText => {
    //if the user doesn't want an about section the if statement will turn an empty string to the main section of the HTML
    if (!aboutText) {
        return '';
    };

    //if the user does want an about section this is returned the main section of the HTML
    return `
        <section class="my-3" id="about">
            <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
            <p>${aboutText}</p>
        </section>
    `;
};

const generateProjects = projectsArr => {

    return`
    <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-space-between">
        <!-- checks to see if user chose to feature project -->
        ${projectsArr
        .filter(({feature}) => feature)
        .map(({ name, description, languages, link}) => {
            return`
            <div class="col-12 mb-2 bg-dark text-light p-3">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h5 class="portfolio-languages">
                    Built With:
                    ${languages.join(', ')}
                </h5
                <p>${description}</p>
                <a href="${link}" target="_blank" class="btn"><i class="fab fa-github mr-2"></i>View Project GitHub</a>
            </div>
            `;
        })
        .join('')}

        <!-- checks to see if the user didn't chose to feature the project -->
        ${projectsArr
            .filter(({feature}) => !feature)
            .map(({ name, description, languages, link}) => {
                return`
                <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                    <h3 class="portfolio-item-title text-light">${name}</h3>
                    <h5 class="portfolio-languages">
                        Built With:
                        ${languages.join(', ')}
                    </h5>
                    <p>${description}</p>
                    <a href="${link}" target="_blank" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                </div>
                `;
            })
        .join('')}
        </div>
    </section>
    `;
};


//the module.exports makes this function available to call in other scripts
module.exports = templateData => {
    //destructure page data by section, the '...' is the rest operator
    const { projects, about, ...header } = templateData;
    
    //in the main section were passing the 'about' property in the object^ to the generateAbout() 
    return `
    <!DOCTYPE hmtl>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <title>Portfolio Demo</title>
    </head>


    <body>
        <header>
            <div class="container flex-row justify-space-between align-center py-3">
                <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
                <nav class="flex-row">
                    <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
                        header.github
                    }" target="_blank">GitHub</a>
                </nav>
            </div>
        </header>

        <main class="container my-5">
            ${generateAbout(about)}
            ${generateProjects(projects)}
        </main>

        <footer class="container text-center py-3">
            <h3 class="text-dark">${new Date().getFullYear()} by ${header.name}</h3>
        </footer>
    </body>
    </html>
    `;
};
