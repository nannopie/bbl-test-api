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

router.get('/findAllUser', async function (req: Request, res: Response, next: NextFunction) {
    const allUsers = await prisma.user.findMany({
        include: {
            address: true,
            company: true
        },
    })
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
    var user = req.body.user;
    var address = req.body.address;
    const geo = req.body.geo;
    const company = req.body.company;
    const geoRes = await prisma.geo.create({
        data: geo
    })
    address.geoId = geoRes.id;
    const addressRes = await prisma.address.create({
        data: address
    })
    const companyRes = await prisma.company.create({
        data: company
    })

    user.addressId = addressRes.id;
    user.companyId = companyRes.id;
    const userRes = await prisma.user.create({
        data: user
    })
    res.json({ userRes })
})

router.put('/updateUser/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: req.body
    })
    res.json({ user })
})

router.patch('/updateEmailByUserId/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: req.body
    })
    res.json({ user })
})

router.delete('/deleteUserById/:userId', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await prisma.user.delete({
        where: { id: parseInt(userId) }
    })
    res.json({ user })
})

export { router as users }