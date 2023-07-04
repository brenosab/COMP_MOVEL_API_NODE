const express = require('express');
const router = express.Router();
const despesaController = require('../controllers/despesa-controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// router.get('/imagens/', despesaController.listProductImages);
router.get('/',despesaController.getByFilters);
router.get('/:linhasPorPagina/:pagina', despesaController.list);
router.post('/', upload.single('anexo'), despesaController.create);
router.get('/:id',despesaController.get);
router.put('/:id', despesaController.update);
router.delete('/:id', despesaController.delete);

module.exports = router;