import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  content: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const movieSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  streaming: {type: String},
  watched: {type: Boolean},
  comments: [commentSchema],
  recBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }

},{
  timestamps: true,
})

const Movie = mongoose.model('Movie', movieSchema)

export { Movie }