import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputPassword from "./components/InputPassword"

function App() {

  let [tip, setTip] = useState<string>('init')
  let [password, setPassword] = useState<number>()
  const handleComplete = (value: number) => {
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
        <InputPassword focus={true}
          fields={6}
          onComplete={handleComplete}
          onBlur={() => { setTip('blur') }}
          onFocus={() => { setTip('focus') }}
        />
      </div>
    </div>
  );
}

export default App;
