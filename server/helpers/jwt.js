const expressJwt = require('express-jwt');

//protecting the API
function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/trainings(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/courses(.*)/ , methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/bookings(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/attendees/login`,
            `${api}/attendees/register`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt