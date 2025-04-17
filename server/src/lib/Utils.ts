import { Request, Response } from "express"
import CodedError from "./CodedError"


export default class Utils {
  req: Request
  res: Response

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  success<Res>(data: Res, message?: string) {
    this.res.status(200).json({
      ...data,
      success: true,
      message: message || "Success",
    })
  }

  error(error: Error | CodedError) {
    let status = 500
    if (error instanceof CodedError) status = error.code
    this.res.status(status ?? 500).json({ success: false, error: error.message })
  }
}
