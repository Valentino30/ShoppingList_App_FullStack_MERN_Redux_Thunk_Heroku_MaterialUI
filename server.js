const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const path = require('path')
const config = require('config')

const app = express()
const port = process.env.PORT || 5000
const db = config.get('MongoURI')

app.use(express.json())

app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(db, { useNewUrlParser: true }, () => console.log('MongoDB connected...'))

app.listen(port, () => console.log('Server listening on port ' + port))