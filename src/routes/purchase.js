import { Router } from "express";
const router = Router();

import { createPurchase, deletePurchase, getAllPurchases, updatePurchase } from '../controllers/purchase.controller'
import { validateToken } from "../middlewares/auth";

/*-----GET-----*/
router.get('/:page',validateToken,getAllPurchases);

/*-----POST-----*/
router.post('/new',validateToken,createPurchase);

/*-----PUT-----*/
router.put('/update/:id',validateToken,updatePurchase);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken,deletePurchase);

export default router;