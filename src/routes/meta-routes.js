const express = require('express');
const router = express.Router();
const metaController = require('../controllers/meta-controller');

router.get('/', metaController.getByFilters);
router.get('/:linhasPorPagina/:pagina', metaController.list);
router.get('/:id', metaController.get);
router.put('/:id', metaController.update);
router.delete('/:id', metaController.delete);
router.post('/', metaController.create);

module.exports = router;