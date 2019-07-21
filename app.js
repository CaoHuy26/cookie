const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000, (err) => {
    if (err) {
        throw err;
    }
   console.log('Sever listening on port 3000....'); 
});