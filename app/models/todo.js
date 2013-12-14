/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

/**
 * Validations
 */
TodoSchema.path('title').validate(function(title) {
  return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }, cb);
};

mongoose.model('Todo', TodoSchema);