const Image = require('../models/image.model');

module.exports.getCreate = (req, res) => {
    res.status(200).render('images/create.ejs');
};

module.exports.postCreate = async (req, res) => {
    // Mục đích để tránh bị lỗi không có ảnh khi submit từ form lên
    // Và để đặt ảnh mặc định khi người dùng không tải ảnh lên

    // Nếu ảnh được gửi
    if (req.file) {
        console.log(req.file.path);
        // 'public\\uploads\\image-1564236194169.png' -> 'uploads\\image-1564236194169.png'
        const path = req.file.path.split('\\').slice(1).join('\\');
        const newImage = {
            user: req.body.user,
            imagePath: path,
            status: req.body.status,
            location: req.body.location,
        };
        
        const result = await Image.create(newImage);
        console.log(result);
        res.status(200).redirect('/');
    }
    // Nếu không có ảnh
    else {
        const newImage = {
            user: req.body.user,
            status: req.body.status,
            location: req.body.location,
        };
        const result = await Image.create(newImage);
        console.log(result);
        res.status(200).redirect('/');
    }   
};

module.exports.viewImageById = (req, res) => {
    const id = req.params.id;
    Image.findById(id).then((image) => {
        res.status(200).render('images/image', { image: image });
    });
};

module.exports.updateImageById = (req, res) => {
    const id = req.params.id;

    Image.findByIdAndUpdate({_id: id}, req.body).then(() => {
        res.status(200).json('Updated');
    })
};

module.exports.deleteImageById = (req, res) => {
    const id = req.params.id;

    Image.deleteOne({ _id: id }).then(() => {
        console.log(`Delete ${id} success!!`);
        res.status(200).redirect('/');
    });
};