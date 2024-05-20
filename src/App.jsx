import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPaswword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = str.charAt(char)
    }

    setPaswword(pass)

  }, [length, numberAllowed, charAllowed, setPaswword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-3 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center mb-4' >Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden" >
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3 
          "
            placeholder='password'
            readOnly
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2 mt-3'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
            />
            <label>Length : {length}</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
