import { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'

var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const router = express.Router();
const prisma = new PrismaClient()

router.get('/getPostByUserId/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const post = await prisma.post.findMany({
        where: {
            userId: {
                equals: parseInt(userId)
            }
            ,
        }
    })
    res.json({ post: post })
})

export { router as posts }