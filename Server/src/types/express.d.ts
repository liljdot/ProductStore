import { Response } from "express";

export interface AppResponse extends Response {
    json: (obj: {
        status: number
        message: string
        data?: any
        error?: any
    }) => any
}