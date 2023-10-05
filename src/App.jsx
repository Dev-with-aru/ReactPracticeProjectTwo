import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("Arunava@Code");
  const Copy = useRef(null);

  const CopyPassword = useCallback(() => {
    Copy.current?.select();
    window.navigator.clipboard.writeText(password);
    setPassword("");
  }, [password, setPassword]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*_-+=`~{}[]/|?><.,";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator]);

  return (
    <div className="bg-gray-950 w-full h-screen flex justify-center">
      <h1 className="text-center z-10 fixed top-10 inset-x-0 text-4xl text-white">
        PassWord Generator
      </h1>
      <div className="w-full h-96 max-w-md mx-auto shadow-md rounded-lg flex items-center bg-gray-600 text-orange-400 px-4 py-2 my-8 flex-wrap">
        <div className="shadow-lg h-10 rounded-lg overflow-hidden mb-4 w-full flex bg-slate-700 justify-center p-2 items-center">
          <input
            type="text"
            value={password}
            ref={Copy}
            className="outline-none underline bg-inherit text-green-300 w-80 py-1 px-3"
          />
          <input
            type="submit"
            value="Copy"
            onClick={CopyPassword}
            className="outline-none cursor-pointer py-1 px-3"
          />
        </div>
        <div className="flex flex-col p-2 -mt-20 rounded-md bg-slate-900 text-sm gap-x-2">
          <h1 className="text-center">~: Set Attributes :~</h1>
          <div className="flex items-center p-3 gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={6}
              max={30}
              id="len"
              onChange={(e) => setLength(e.target.value)}
              value={length}
            />
            <label htmlFor="len">Length: {length}</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              id="ch"
              onChange={() => setCharacters((pre) => !pre)}
              value={characters}
            />
            <label htmlFor="ch">Characters: {characters}</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              id="num"
              onChange={() => setNumbers((pre) => !pre)}
              value={numbers}
            />
            <label htmlFor="num">Numbers: {numbers}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
