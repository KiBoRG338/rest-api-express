const express = require('express');
const { v1: uuid } = require('uuid');
const router = express.Router();

let books = [
    {
        id: '1',
        author: 'John',
        title: 'JavaScript Book'
    }
]

router.get('/', (req, res) => {
    res.json(books);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const book = books.find(b => b.id === id);
    if(book){
        return res.json(book);
    }
    return res.status(404).json({
        status: `Book with ${id} not found`
    })
})

router.post('/', (req, res) => {
    const { title, author } = req.body;
    console.log(req.body);
    const book = {
        id: uuid(),
        title: title || 'Default title',
        author: author || 'Default author' 
    }

    books.push(book);
    return res.json(book);
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    books.forEach((book) => {
        if(book.id === id){
            book.title = title;
            book.author = author;
        }
    })

    const newBook = books.find(b => b.id === id);

    return res.json(newBook)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const existBook = books.find(b => b.id === id);

    if(!existBook){
        return res.send(`Book with ${id} doesn't exist`).status(404);
    }

    books = books.filter(b => b.id != id);

    return res.send(`Book with ${id} was deleted`).status(200);


})

module.exports = router;