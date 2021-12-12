import { writeFileSync } from 'fs'
import express, { json } from 'express'
import cors from 'cors'
import { PythonShell } from 'python-shell'
let a = false

const app = express()

const port = 3001

app.use(cors({ origin: true, credentials: true }))
app.use(json())

// Configuration of python shell to run code file
let options = {
    mode: "text",
    pythonOptions: ['-u'], // it unbuffers the streams(stdin,stdout)
    args: [1, 2, 3]
}


app.post("/py", (req, res) => {
    writeFileSync("code.py", req.body.code);

    PythonShell.run("code.py", options, (err, result) => {
        if (err) throw err;

        console.log(`result: ${result}`)
        a = result
    })


    res.json({
        message: `it's ${a}`
    })
})







app.listen(port, () => {
    console.log(`server active at port ${port}`)
})

