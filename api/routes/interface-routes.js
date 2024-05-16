import express from "express";
import {
  setInterface,
  getInterfaceReponse,
  setIsLocation,
  setVideoSuivante,
  setIsPlayingVideo,
  getIsLocation,
  getIsPlayingVideo,
  getVideoSuivante,
  getListVideo
} from "../controller/interface-controller.js";

const router = express.Router();


router.get("/getInterface", getInterfaceReponse);
router.get("/getIsLocation",getIsLocation)
router.get("/getIsPlayingVideo",getIsPlayingVideo)
router.get("/getVideoSuivante",getVideoSuivante)
router.get("/getListVideo",getListVideo)

router.post("/miseAJourInterface", setInterface);
router.post("/setIsLocation",setIsLocation)
router.post("/setVideoSuivante",setVideoSuivante)
router.post("/setIsPlayingVideo",setIsPlayingVideo)

export default router;
