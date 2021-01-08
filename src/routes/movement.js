import { Router } from "express";
const router = Router();

import { validateToken } from "../middlewares/auth";
import { createMovement, deleteMovement, getAllMovements, getOneMovement, updateMovement } from "../controllers/movement.controller";

/*-----GET-----*/
router.get('/',validateToken, getAllMovements);
router.get('/:id',validateToken, getOneMovement);


/*-----POST-----*/
router.post('/new',validateToken, createMovement);

/*-----PUT-----*/
router.put('/update',validateToken, updateMovement);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken, deleteMovement);

export default router;