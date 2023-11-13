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

router.get('/findAllUser', async function (req: Request, res: Response, next: NextFunction) {
    const allUsers = await prisma.user.findMany({
        include: {
            address: true,
            company: true,
          },
    })
    console.log(allUsers)
    res.json({ user: allUsers })
})

router.get('/findUserByName/:name', async function (req: Request, res: Response, next: NextFunction) {
    const nameInput = req.params.name;
    const user = await prisma.user.findMany({
        where: {
            name: {
                contains: nameInput
            }
        },
    })
    res.json({ user: user })
})

router.get('/getUserById/:id', async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
        where: { id: parseInt(id) },
    })
    res.json({ user: user })
})

router.post('/createUser', async function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    const user = await prisma.user.create({
        data: req.body
    })
    console.log(user);
    res.json({ user })
})

router.put('/updateUser/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    console.log(userId)
    const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: req.body
    })

    console.log(user);
    res.json({ user })
})

router.patch('/updateEmailByUserId/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    console.log(userId)
    const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: req.body
    })
    console.log(user);
    res.json({ user })
})

router.delete('/deleteUserById/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await prisma.user.delete({
        where: { id: parseInt(userId) }
    })
    console.log(user);
    res.json({ user })
})

export { router as users }