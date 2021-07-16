import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import Keyboard from "./components/Keyboard"
import InputNumber from './components/InputNumer'
import Verification, { ClearRef } from './components/Verification'

function App() {


  let [tip, setTip] = useState<string>('init')
  let [password, setPassword] = useState<string>()
  const passwordRef = useRef(null)

  const verificationRef = useRef<ClearRef>(null)

  const clear = () => {
    if (!verificationRef.current) return
    verificationRef.current.clear()
  }

  const focus = () => {
    if (!verificationRef.current) return
    verificationRef.current.focus()
  }

  const handleComplete = (value: string) => {
    console.log("handleComplete  value:", value)
    setPassword(value)
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className='main'>

        <div className="tip">{tip}</div>
        <Verification ref={verificationRef} fields={4} isPassword={false} isNumber={true} onComplete={handleComplete}></Verification>
        <div className="tip password">{password}</div>
        <div className="tip" onClick={focus}>聚焦</div>
        <div className="tip password" onClick={clear}>清空</div>

        {/* <Keyboard onKeyPress={() => { }} onDelete={() => { }} /> */}

        {/* <InputNumber
          fields={6}
          isKeboardFixed={true}
          onComplete={handleComplete}
          ref={passwordRef}
        >
        </InputNumber> */}
        <div className='blank'></div>
      </div>
    </div>
  );
}

export default App;
