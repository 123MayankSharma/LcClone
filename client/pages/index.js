import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import axios from 'axios'
import { pythonLanguage } from '@codemirror/lang-python'
export default function Home() {
    const [code, setCode] = useState('')
    const [testCases, setTestCases] = useState([])
    // const [successMessage,setSuccessMessage]=useState(" ")
    const submitCode = () => {
        axios
            .post('http://localhost:3001/py', { code })
            .then(({ data }) => {
                setTestCases([data.Message])
            })
        // setSuccessMessage("successfully Submitted!")
        // setTimeout(() => {
        //      setSuccessMessage(" ")
        // }, 3000);

    }


    return (
        <div>
            <div className="absolute top-20 bottom-40 left-10 right-10 text-left">
                <div className="border-2 border-solid w-auto text-gray-200 text-xl max-w-lg bg-gray-800">Q)Create a function that adds two numbers in python.</div>
                  {testCases.map((testCase, idx) => {
                return(
                        <div key={ idx }>
                            <div >{testCase==="True"?`Test case ${idx+1} Passed😃 `:`Test Case ${idx+1} failed ☹️`}</div>
                        </div>
                    )
                    })} 
                <CodeMirror
                    value={code}
                    height="400px"
                    width="800px"
                    extensions={pythonLanguage}
                    theme="dark"
                    onChange={(value) => {
                        setCode(value)
                    }}
                />
                <div className="flex flex-row justify-center mr-14 float-left ml-9 mt-6"><button type="submit" className="border-2 bg-green-200 absolute px-2 py-2 hover:bg-blue-400" onClick={submitCode}>Submit</button>
                    {/* <div className="mr-auto z-10">{successMessage}</div> */}
               
                </div>
            </div>

        </div>
    )
}
