var { expressjwt: jwt } = require("express-jwt");
function authJwt() {
    const secret = process.env.secret
    const api = process.env.API_URL
    return jwt({
        secret,
        algorithms: ['HS256'],
        // isRevoked: isRevoked
    })   
    .unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users`

        ]
    })
}

// async function isRevoked(req, paylaod, done) {
//     if(paylaod.isAdmin) {
//         done(null, true)
//     }
//     done()
// }
module.exports = authJwt
