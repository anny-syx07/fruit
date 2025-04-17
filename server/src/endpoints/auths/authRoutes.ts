import { Router } from "express"
import loginRouter from "./login/routes"
import logoutRouter from "./logout/routes"

const authRoutes = Router()

authRoutes.use("/login", loginRouter.router)
authRoutes.use("/logout", logoutRouter.router)

export default authRoutes