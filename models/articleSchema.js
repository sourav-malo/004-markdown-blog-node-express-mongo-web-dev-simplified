const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const DOMPurify = createDOMPurify(new JSDOM('').window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  slug: {
    type: String,
    required: true,
    unique: true 
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  sanitizedHtml: {
    type: String,
    required: true 
  }
})

articleSchema.pre('validate', function(next) {
  if(this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  
  if(this.markdown) {
    this.sanitizedHtml = DOMPurify.sanitize(marked.marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)