
class Movie {
    constructor(router) {
        router.get('/', (req, res) => {
            res.send("Hello there")
        })
    }
}

module.exports = Movie;