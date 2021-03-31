const express = require('express')
const path = require('path')
const app = express()

require('dotenv').config()
const { PORT } = process.env

app.use(express.static(path.join(__dirname, "..", "public")))

app.get('/', (req, res) => {
	console.log('GET /');
	res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
