const express = require('express');
const router = express.Router();
const planoController = require('../controllers/plano-controller');

router.get('/', planoController.getByFilters);
router.get('/:linhasPorPagina/:pagina', planoController.list);
router.get('/:id', planoController.get);
router.put('/:id', planoController.update);
router.delete('/:id', planoController.delete);

module.exports = router;