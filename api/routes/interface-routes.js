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
  getListVideo,
  insertNewVideo,
  download_video,
  delete_video
} from "../controller/interface-controller.js";
import upload from "../middleware/upload-video.js"

const router = express.Router();


router.get("/getInterface", getInterfaceReponse);
router.get("/getIsLocation",getIsLocation)
router.get("/getIsPlayingVideo",getIsPlayingVideo)
router.get("/getVideoSuivante",getVideoSuivante)
router.get("/getListVideo",getListVideo)
router.get("/downloadVideo",download_video)

router.post("/miseAJourInterface", setInterface);
router.post("/setIsLocation",setIsLocation)
router.post("/setVideoSuivante",setVideoSuivante)
router.post("/setIsPlayingVideo",setIsPlayingVideo)
router.post("/addVideo",upload.single('file'),insertNewVideo)
router.post("/deleteVideo",delete_video)

export default router;
