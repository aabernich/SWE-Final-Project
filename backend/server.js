import express from 'express'

import{getUser, createUser} from './database.js'

const app = express()

app.use(express.json())

app.get("/users", async (req,res) => {
    const {email, password} = req.body
    const user = await getUser(email, password)
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    res.send(user)
})

app.post("/users", async (req,res) => {
    const {username, email, password} = req.body
    const user = await createUser(username, email, password)
    res.status(201).send(user)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})