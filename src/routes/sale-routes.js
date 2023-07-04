const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale-controller');

router.get('/:linhasPorPagina/:pagina', saleController.listSales);
router.post('/', saleController.createSale);
router.get('/:id',saleController.getSale);
router.get('/',saleController.getSales);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;