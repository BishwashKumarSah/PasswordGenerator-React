import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [copyBtn,setCopyBtn] = useState(false);
  const [sliderLength, setSliderLength] = useState(8);

  const passwordRef = useRef(null)

  const CopyToClipBoard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password);
      setCopyBtn(true);
      setTimeout(()=>{
        setCopyBtn(false)
      },1000)
  }, [password])

  

  const GeneratePassword = useCallback(() => {
    let passwordStr = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) {
      str += "0123456789";
    }
    if (isCharacter) {
      str += '!@#$%^&*(){}><?"|~`';
    }
    for(let i=0;i<sliderLength;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      passwordStr += str.charAt(char);
    }
    setPassword(passwordStr)
  }, [sliderLength,isNumber,isCharacter]);

  useEffect(() => {
    GeneratePassword();
  }, [GeneratePassword]);

  const MAX = 99;
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(sliderLength * 100) / MAX}% 100%`,
    };
  };
  return (
    <>
      <div className="main__container">
        <div className="password__container">
          <h1 className="title">Password Generator</h1>
          <div className="password__field">
            <input
              type="text"
              placeholder="password"
              className="password__input"
              value={password}
              readOnly
              ref={passwordRef}
            />
            {copyBtn ?<button className="copy__btn copied__btn" onClick={CopyToClipBoard}>Copied</button>:<button className="copy__btn" onClick={CopyToClipBoard}>Copy</button>}
            
            {console.log(passwordRef)}
          </div>
          <div className="slider__field">
            <input
              type="range"
              min={0}
              max={MAX}
              style={getBackgroundSize()}
              className="slider"
              value={sliderLength}
              onChange={(e) => setSliderLength(e.target.value)}
            />
            <p className="slider__p">Length: {sliderLength}</p>
          </div>
          <div className="checkbox__field">
            <div className="checkbox__number checkbox__container">
              <input
                type="checkbox"
                name="numbers"
                id="numbers"
                value={isNumber}
                onChange={() => setIsNumber((prev) => !prev)}
                className="checkbox numbers__checkbox"
              />
              <label
                htmlFor="numbers"
                className="number__title checkbox__title"
              >
                Numbers
              </label>
            </div>
            <div className="checkbox__characters checkbox__container">
              <input
                type="checkbox"
                name="characters"
                id="characters"
                value={isCharacter}
                onChange={() => setIsCharacter((prevState) => !prevState)}
                className="checkbox characters__checkbox"
              />
              <label
                className="number__title checkbox__title"
                htmlFor="characters"
              >
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
