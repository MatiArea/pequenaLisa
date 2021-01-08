import { Router } from "express";
import { createSale, deleteSale, getAllSales, getOneSale, updateSale } from "../controllers/sale.controller";
const router = Router();


import { validateToken } from '../middlewares/auth'

/*-----GET-----*/
router.get('/:page',validateToken,getAllSales);
router.get('/:id',validateToken,getOneSale);

/*-----POST-----*/
router.post('/new',validateToken,createSale);

/*-----PUT-----*/
router.put('/update',validateToken,updateSale);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken,deleteSale);

export default router;