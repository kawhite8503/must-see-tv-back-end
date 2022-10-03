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

function deleteOne(req,res){
  Movie.findById(req.params.id)
  .then(movie => {
    if (movie.owner._id.equals(req.user.profile)){
      Movie.findByIdAndDelete(req.params.id)
      .then(deletedMovie => {
        res.json(deletedMovie)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

function update(req, res){
  Movie.findById(req.params.id)
  .then(movie => {
    if (movie.owner._id.equals(req.user.profile)){
      Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedMovie => {
        res.json(updatedMovie)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

export {
  create,
  index,
  deleteOne as delete,
  update,

}