import express from "express";
import { setInterface } from "../controller/interface-controller.js";

const router = express.Router();

router.post("/miseAJourInterface",setInterface);

export default router;
