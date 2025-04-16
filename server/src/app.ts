import "dotenv/config"
import express, { json } from "express"
import path from "path"

const app = express()

app.use(json())
app.get("/api", (req, res) => {
  res.send("Hello World!")
})

const frontendLocation = path.join(__dirname, "..", "..", "frontend")

console.log(frontendLocation)

// serve files from /frontend
app.use("/", express.static(frontendLocation))

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendLocation, "index.html"))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
