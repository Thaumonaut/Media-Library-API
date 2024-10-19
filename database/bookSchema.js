const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Please, add a valid title'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    minlength: [3, 'Please, add an author name with at least 3 characters long'],
  },
  description: {
    type: String,
    minlength: [10, 'Description must be at least 10 characters long'],
    default: '',
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1000, 'Release year must be a valid number'],
    max: [new Date().getFullYear(), 'Release year must be a valid number'],
  },
  pages: {
    type: Number,
    min: [1, "Please, add the book's page number"],
  },
  ISBN10: {
    type: String,
    validate: {
      validator: function (v) {
        return v == null || (v.length === 10 && /^\d+$/.test(v));
      },
      message: 'ISBN10 must be exactly 10 digits and contain only digits',
    },
  },
  ISBN13: {
    type: String,
    validate: {
      validator: function (v) {
        return v == null || (v.length === 13 && /^\d+$/.test(v));
      },
      message: 'ISBN13 must be exactly 13 digits and contain only digits',
    },
  },
}, {
  timestamps: true,
});

// Custom validation for ISBN10 or ISBN13
bookSchema.pre('validate', function (next) {
  if (!this.ISBN10 && !this.ISBN13) {
    this.invalidate('ISBN10', 'At least one of ISBN10 or ISBN13 is required');
    this.invalidate('ISBN13', 'At least one of ISBN10 or ISBN13 is required');
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
