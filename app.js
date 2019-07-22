const express = require('express');
// For generate ID
const uniqid = require('uniqid');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }
        const items = JSON.parse(data);
        res.status(200).render('index.ejs', {
            items: items
        });
    });
});

app.get('/admin', (req, res) => {
    res.status(200).render('users/admin.ejs');
});

app.get('/create-item', (req, res) => {
    res.status(200).render('items/create-item.ejs');
});

app.post('/create-item', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }
        const newItem = {
            id: uniqid(),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            createAt: new Date(),
        };
        console.log(newItem);
        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile('./data.json', JSON.stringify(items), (err) => {
            if (err) {
                throw err;
            }
            res.status(200).redirect('/');
        })
    });
});

app.get('/item', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }
        const items = JSON.parse(data);
        res.status(200).render('items/view-all-item', { items: items });
    });
});

app.get('/item/:id', (req, res) => {
    const q = req.params.id;
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }
        const items = JSON.parse(data);
        for (let item of items) {
            if (item.id === q) {
                res.status(200).render('items/view-item', { item: item });
                return;
            }
        }
        res.status(404).send('Not Found');
    });
});

// Must be delete by app.delete
app.get('/item/delete/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            throw err;
        }
        const items = JSON.parse(data);
        for (let item of items) {
            if (item.id === id) {
                items.splice(items.indexOf(item), 1);
                fs.writeFile('./data.json', JSON.stringify(items), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Deleted')
                    return;
                });
            }
        }
    });
});


app.listen(3000, (err) => {
    if (err) {
        throw err;
    }
    console.log('Sever listening on port 3000....');
});
