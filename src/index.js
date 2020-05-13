const express = require('express')
const path = require('path')
const axios = require('axios')

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

const app = express()
const OMDB_API_KEY = 'b1576fbe'

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Search Movies: dev version'
    })
})

app.get('/search', (req, res) => {
    const name = req.query.name
    const id = req.query.id
    if(!name && !id) {
        return res.send({error: 'please give movie name or IMDB movie ID'})
    }
    let url
    if(name)
        url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${name}`
    else
        url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
	axios.get(url).then((result) => {
        const ob = result.data
        res.status(200).send({
            name: ob.Title,
            date: ob.Released,
            rating: ob.imdbRating,
            actors: ob.Actors,
            plot: ob.Plot,
            error: ob.Error
        })
	}).catch((e) => {
		res.status(400).send(e)
	}) 
})

app.get('*', (req, res) => {
    res.send('<h1>page not found</h1>')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

