import { CookieOptions, Request, Response } from "express"
import { Selectable } from "kysely"
import { DB } from "../../../lib/db"
import { db } from "../../../lib/database"

export default class LoginModel {
  req: Request
  res: Response

  constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  public async addsession(location: Selectable<DB["Locations"]>): Promise<void> {
    const query = await db
      .selectFrom("Locations")
      .where("location_id", "=", location.location_id)
      .select(["name", "password", "location_id"])
      .executeTakeFirst()

    const cookieOptions: CookieOptions = {
      domain: process.env.BASE_URL ?? "localhost",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      secure: process.env.APP_ENV === "production",
      sameSite: "strict",
    }

    this.res.cookie("_name", query?.name, cookieOptions)
    this.res.cookie("_password", query?.password, cookieOptions)
    this.res.cookie("_locationID", query?.location_id, cookieOptions)
  }
  
  public removeSession() {
    const cookieOptions: CookieOptions = {
      domain: process.env.BASE_URL ?? "localhost",
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: process.env.APP_ENV === "production",
      sameSite: "strict",
    }

    this.res.cookie("_name", cookieOptions)
    this.res.cookie("_password", cookieOptions)
    this.res.cookie("_locationID", cookieOptions)
  }
}
