import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Keyboard from "./components/Keyboard"
import InputNumber from './components/InputNumer'

function App() {

  let [tip, setTip] = useState<string>('init')
  let [password, setPassword] = useState<string>()
  const passwordRef = useRef()
  const handleComplete = (value: string) => {
    console.log("value:", value)
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
        <div className="tip password">{password}</div>
        {/* <Keyboard onKeyPress={() => { }} onDelete={() => { }} /> */}

        <InputNumber
          fields={6}
          isKeboardFixed={true}
          onComplete={handleComplete}
          ref={passwordRef}
        >
        </InputNumber>
        <div className='blank'></div>
      </div>
    </div>
  );
}

export default App;
