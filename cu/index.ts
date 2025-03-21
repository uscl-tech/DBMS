import express, { type Request, type Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
  res.json({
    server: "server is running successfully",
  })
})

app.listen(4040, () => {
  console.log("\n\t server is running successfully\n\t 127.0.0.1:4040 ")
})

