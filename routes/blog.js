const express = require('express')
const router = express()

const models = require('/Users/willis/Documents/digital_crafts/week8/blogSequelize/models')


router.get('/', (req, res) => {
    models.Blog.findAll().then(blogs => {

        res.render('blog', { blogs: blogs })
    })
})

// add new blog //////////////////////////
router.get('/add', (req, res) => {
    res.render('add-post')
})

router.post('/add', (req, res) => {
    let title = req.body.title
    let body = req.body.body

    let blog = models.Blog.build({
        title: title,
        body: body
    })
    blog.save().then(newBlog => {
        res.redirect('/blog')
    })

})
/////////////////////////////////////////

// add commment
router.get('/:id/add-comment', (req, res) => {
    let blogId = req.params.id
    console.log(blogId)
    res.render('add-comment', { blogId: blogId })
})
// post commment
router.post('/add-comment', (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let blogId = req.body.blogId

    let comment = models.Comment.build({
        title: title,
        body: body,
        blog_id: blogId
    })
    comment.save().then(newComment => {
        res.redirect(`/blog/${blogId}`)
    })

})

router.get('/:blogId', (req, res) => {
    let blogId = req.params.blogId

    models.Blog.findByPk(blogId, {
        include: [
            {
                model: models.Comment,
                as: 'Comments'
            }
        ]
    }).then(blog => {
        console.log(blog)
        res.render('add-comment', {Comments: blog.dataValues})

    })

})

// Delete post
router.post('/delete-post/:id',(req,res)=>{
    let blogId = req.params.id
    console.log(blogId)
   

    models.Comment.destroy({
        where: 
        {blog_id:blogId},
    }).then(()=>{
        models.Blog.destroy({
            where: 
            {id:blogId},
        })
        res.redirect('/blog')
    })
    

   

})

router.get('/delete-post/:id',(req,res)=>{
        
    res.send('hello')
})





module.exports = router