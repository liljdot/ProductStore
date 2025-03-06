import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node"
import dotenv from "dotenv"

dotenv.config()

const { ARCJET_KEY } = process.env

// inIt arcjet
const aj = arcjet({
    key: ARCJET_KEY || "",
    characteristics: ["ip.src"],
    rules: [
        // shield protects app from common attacks such as sql injection, xss and csrf
        shield({ mode: "LIVE" }),
        // block all bots except search engines
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })
    ]

})

export { aj }