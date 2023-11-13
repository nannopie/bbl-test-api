var express = require('express')
const router = express.Router();
import swaggerUi from 'swagger-ui-express'
import fs from "fs";
import YAML from 'yaml'
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { router as swaggerUi }