const Image = require('../models/image.model');

module.exports.getIndex = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    Image.find({}).then((images) => {
        res.status(200).render('index',
            {
                images: images.slice(start, end),
                length: images.length,
                perPage: perPage
            });
    });
};