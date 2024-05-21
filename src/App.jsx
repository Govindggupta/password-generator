import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPaswword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) // Fixed to append each character to pass
    }

    setPaswword(pass)

  }, [length, numberAllowed, charAllowed, setPaswword])



  const copyPasswordToClipboard = useCallback(
    () => {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 101)
      // to select only in range we will decide
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )



  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: 'none' }}>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-3 text-black bg-gray-800 bg-opacity-40'>
        <h1 className='text-white text-center text-lg mb-4 '>Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2 mt-3 text-yellow-400'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer bg-gray'
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                // here prev is used to make new value reverse of previous value , iski jagah only setNumberAllowed(true) karte to usse ek hi bar change hota i.e, ek bar change karne pe value vahi rehti reload karne tak
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
                // here prev is used to make new value reverse of previous value
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App