require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/articleSchema')
const articleRouter = require('./router/articleRouter')
const app = express()

mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find()
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)