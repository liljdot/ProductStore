import { NextFunction, Request, Response } from "express";
import { aj } from "../lib/arcjet.js";
import { AppResponse } from "../types";

const arcjetConfig = (req: Request, res: AppResponse, next: NextFunction) => {
    aj.protect(req, {
        requested: 1
    })
        .then(decision => {
            if (decision.isDenied()) {
                if (decision.reason.isRateLimit()) {
                    return res.status(429).json({ status: 429, message: "Too many requests", error: decision.reason.type })
                }

                if (decision.reason.isBot()) {
                    return res.status(403).json({ status: 403, message: "Bot access denied", error: decision.reason.type })
                }

                return res.status(403).json({ status: 403, message: "Forbidden", error: decision.reason.type })
            }

            if (decision.results.some(result => result.reason.isBot() && result.reason.isSpoofed())) {
                return res.status(403).json({ status: 403, message: "Spoofed bot detected", error: "Spoofed bot detected" })
            }

            next()
        })
        .catch(error => {
            console.log("Arcjet error", error)
            next(error)
        })
}

export default arcjetConfig