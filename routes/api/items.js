const express = require('express')
const Item = require('../../models/Item')
const auth = require('../../middleware/auth')

const router = express.Router()

router.get('/', auth, (req, res) => {
    Item
        .find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
})

router.post('/', auth, (req, res) => {

    const newItem = new Item({
        itemName: req.body.itemName
    })
    
    newItem
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err))
})

router.delete('/:id', auth, (req, res) => {
    
    const id = req.params.id

    Item
        .findByIdAndDelete(id)
        .then(item => res.json(item))
        .catch(err => console.log(err))
})

router.put('/:id', auth, (req, res) => {

    const id = req.params.id
    const isChecked = req.body.isChecked
    
    Item
        .findByIdAndUpdate(id, { 'isChecked': !isChecked }, { new: true, useFindAndModify: false})
        .then(toggledItem => res.json(toggledItem))
        .catch(err => console.log(err))
})

module.exports = router