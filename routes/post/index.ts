import { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'

var express = require('express')
var cors = require('cors')
var app = express()
const router = express.Router();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
const prisma = new PrismaClient()

router.get('/findAllPost', async function (req: Request, res: Response, next: NextFunction) {
    const allPosts = await prisma.post.findMany()
    console.log(allPosts)
    res.json({ post: allPosts })
})

router.get('/getPostByUserId/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const post = await prisma.post.findMany({
        where: {
            userId: {
                equals: parseInt(userId)
            }
            ,
        },
    })
    res.json({ post: post })
})

router.post('/createPost', async function (req: Request, res: Response, next: NextFunction) {
    var post = req.body.post;
    const postRes = await prisma.post.create({
        data: post
    })
    res.json({ postRes })
})

router.put('/updatePost/:id', async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: req.body
    })
    res.json({ post })
})

router.patch('/updateBodyById/:id', async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: req.body
    })
    res.json({ post })
})

router.delete('/deleteUserById/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    console.log(userId);
    res.json("delete")
})


router.delete('/deletePostById/:id', async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await prisma.post.delete({
        where: { id: parseInt(id) }
    })
    res.json({ post })
})
export { router as posts }