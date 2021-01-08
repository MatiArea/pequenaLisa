import { Router } from "express";
const router = Router();

import { createAccount, deleteAccount, updatePassword, updateUsername, validateAccount } from '../controllers/user.controller'
import { validateToken } from "../middlewares/auth";

/*-----GET-----*/

/*-----POST-----*/
router.post('/login',validateAccount);
router.post('/new',createAccount);

/*-----PUT-----*/
router.put('/updateUsername',validateToken,updateUsername);
router.put('/updatePassword',validateToken,updatePassword);


/*-----DELETE-----*/
router.delete('/delete',validateToken,deleteAccount);

export default router;