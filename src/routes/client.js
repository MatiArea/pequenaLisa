import { Router } from "express";
const router = Router();

import { createClient, deleteClient, generateListPdf, getAllClients, getAllClientsTable, getOneClient, updateBalance, updateClient } from '../controllers/client.controller'
import { validateToken } from "../middlewares/auth";


/*-----GET-----*/
router.get('/',validateToken,getAllClients);
router.get('/:page',validateToken,getAllClientsTable);
router.get('/:id',validateToken,getOneClient);

/*-----POST-----*/
router.post('/new',validateToken,createClient);
router.post('/downloadlist',validateToken,generateListPdf)

/*-----PUT-----*/
router.put('/update',validateToken,updateClient);
router.put('/updatebalance',validateToken,updateBalance);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken,deleteClient);

export default router;