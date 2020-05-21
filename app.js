const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const blogRouter = require('./routes/blog')


app.use(express.urlencoded())

app.engine('mustache', mustacheExpress())
app.set('views', "./views")
app.set('view engine', 'mustache')

app.use('/blog', blogRouter)





app.listen(3000,()=>{
    console.log('Server is running...')
})