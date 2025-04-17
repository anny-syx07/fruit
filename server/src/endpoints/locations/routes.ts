import { Router } from "express"
import { db } from "../../lib/database"

const locationsRouter = Router()

locationsRouter.get("/", async (req, res) => {
  try {
    const locationsList = await db.selectFrom("Locations").selectAll().execute()
    res.json(locationsList)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

export default locationsRouter
