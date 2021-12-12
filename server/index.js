import { writeFileSync } from 'fs'
import express, { json } from 'express'
import cors from 'cors'
import { PythonShell } from 'python-shell'
let a = []

const app = express()

const port = 3001

app.use(cors({ origin: true, credentials: true }))
app.use(json())

//these are the test cases on which code will be run!
const testCases = [
    [1, 2, 3],
    [2, 2, 4],
    [5, 4, 8]
]

// Configuration of python shell to run code file
// let options = {
//     mode: "text",
//     pythonOptions: ['-u'], // it unbuffers the streams(stdin,stdout)
//     args: []
// }


app.post("/py", (req, res) => {
    writeFileSync("code.py", req.body.code);
    for (let index = 0; index < testCases.length; index++) {
        PythonShell.run("code.py", {
            mode: "text",
            pythonOptions: ['-u'], // it unbuffers the streams(stdin,stdout)
            args: testCases[index]
        }, (err, result) => {
            if (err) throw err;

            // console.log(`result: ${result}`)
            a.push(result[0]);
        })


    }
    // PythonShell.run("code.py",  {
    // mode: "text",
    // pythonOptions: ['-u'], // it unbuffers the streams(stdin,stdout)
    // args: testCases[i];
    // } , (err, result) => {
    //     if (err) throw err;

    //     console.log(`result: ${result}`)
    //     a.push_back(result[0]);
    // })
    console.log(a);


    res.json({
        message: a
    })
    a = []
})







app.listen(port, () => {
    console.log(`server active at port ${port}`)
})

