import express from "express";
import { setInterface,getInterfaceReponse } from "../controller/interface-controller.js";

const router = express.Router();

router.post("/miseAJourInterface",setInterface);
router.get("/getInterface",getInterfaceReponse);

export default router;
