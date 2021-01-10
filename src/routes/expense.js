import { Router } from "express";
const router = Router();

import { createExpense, deleteExpense, getAllExpenses, getOneExpense, updateExpense } from '../controllers/expense.controller'
import { validateToken } from '../middlewares/auth'

/*-----GET-----*/
router.get('/all/:page',validateToken,getAllExpenses);
router.get('/:id',validateToken,getOneExpense);

/*-----POST-----*/
router.post('/new',validateToken,createExpense);

/*-----PUT-----*/
router.put('/update',validateToken,updateExpense);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken,deleteExpense);

export default router;