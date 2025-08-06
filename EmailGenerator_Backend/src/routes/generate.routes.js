import express from "express"
import { generate } from "../controllers/generate.controller.js"
import { sendmail } from "../controllers/send.controller.js"


const generaterouter = express.Router()

generaterouter.route("/generateemail").post(generate)

generaterouter.route("/send").post(sendmail)

export { generaterouter }