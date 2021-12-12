const fs = require('fs')
const express = require('express')
const cors = require('cors')

let a = false

const app = express()

const port = 3001

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())




app.post("/py", (req, res) => {
    writeFileSync("code.py", req.body.code);
    
    let options


    res.json({
        message: `it runs ${a}`
    })
})







app.listen(port, () => {
    console.log(`server active at port ${port}`)
})

