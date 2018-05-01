const https = require('https');


function printError(error) {
    console.error(error.message);
}

function printMessage(username, badgeCount, points) {
    const message = `username: ${username} \n badgeCount: ${badgeCount} \n points: ${points}`;
    console.log(message);
}


function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
            if (response.statusCode === 200) {

                let body = "";


                response.on('data', (dataChunck) => {
                    body += dataChunck.toString();
                });

                response.on('end', () => {
                    try {
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = 'There was an error getting the profile info';
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });

        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}

const users = process.argv.slice(2);

users.forEach(getProfile);