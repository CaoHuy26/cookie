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
    res.status(200).render('index.ejs');
});

app.get('/admin', (req, res) => {
    res.status(200).render('admin/admin.ejs');    
});

app.get('/admin/create', (req, res) => {
    res.status(200).render('admin/create.ejs');    
});

app.post('/admin/create', (req, res) => {
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
            createAt: new Date().toLocaleString,
        };
        console.log(newItem);
        const items = JSON.parse(data);
        items.push(newItem);
        
        fs.writeFile('./data.json', JSON.stringify(items), (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send('Created item');
        }) 
    });
});

app.listen(3000, (err) => {
    if (err) {
        throw err;
    }
   console.log('Sever listening on port 3000....'); 
});