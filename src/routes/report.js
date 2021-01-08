import { Router } from "express";
const router = Router();

import { dayReport, monthReport, weekReport, yearReport } from "../controllers/report.controller";
import { validateToken } from "../middlewares/auth";

/*-----GET-----*/
router.get('/dayreport/:date',validateToken,dayReport);
router.get('/weekreport/:init/:finish',validateToken,weekReport);
router.get('/monthreport/:month',validateToken,monthReport);
router.get('/yeareport/:year',validateToken,yearReport);




export default router;