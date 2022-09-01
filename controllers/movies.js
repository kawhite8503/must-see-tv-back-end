import { Movie } from "../models/movie.js"

function create(req, res) {
  req.body.owner = req.user.profile
  Movie.create(req.body)
  .then(movie => {
    Movie.findById(movie._id)
    .populate('owner')
    .then(populatedMovie => {
      res.json(populatedMovie)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

function index(req, res){
  Movie.find({})
  .populate('owner')
  .then(movies => {
    res.json(movies)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

export {
  create,
  index,
}