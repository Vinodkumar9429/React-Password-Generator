import React, { useCallback, useEffect, useRef, useState } from 'react'
const App = () => {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const passRef = useRef(null);
  const [btnText, setBtnText] = useState("Copy");
  // const butNameRef = useRef(null);

  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  const passwordGEnerator = useCallback(()=>{

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let strSm = 'abcdefghijklmnopqrstuvwxyz';
    let chars = "!@#$_@#!$";
    let nums = '0123456789';
    let empty = "";

    const first = str.charAt(Math.floor(Math.random() * (str.length-1)));
    const specials = chars.charAt(Math.floor(Math.random() * (chars.length-1)));
    const num = nums.charAt(Math.floor(Math.random() * (nums.length-1)));
    for(let i = 2; i<length; i++){
      const vals = strSm.charAt(Math.floor(Math.random() * (strSm.length-1)));
      empty += vals;
    }

    pass = first;
    if(charAllowed) pass += specials;
    if(numberAllowed) pass += num;
    pass += empty;
    const val = pass.split("");
    const res = shuffleArray(val);
    




    // for(let i = 0; i<length; i++){
    //   const val = Math.random() * ((str.length-1)-0) + 0;
    //   pass += str.charAt(val);
    // }
    setPassword(res.join(""));

  }, [length, charAllowed, setPassword, numberAllowed])

  const copyPassword = () =>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // butNameRef.current.textContent = "Clicked!"
    // setTimeout(()=>{
    //   butNameRef.current.innerHTML = "Copy"
    // }, 3000)
    setTimeout(()=>{
      setBtnText("Copy");
    }, 3000)
    setBtnText("Copied")
    // clearTimeout(int);

  }

  useEffect(()=>{
    passwordGEnerator();
  },[length, charAllowed, numberAllowed, passwordGEnerator])

  return (

    <div className='w-screen h-screen bg-[#FAF9F7] flex justify-center items-center px-4'>

        <div className='lg:w-1/2 w-full min-h-60 bg-[#E5E1DA] rounded-xl py-4 flex flex-col justify-center items-center shadow-2xl shadow-emerald-600
'>
            <h1 className='font-general-sans font-medium md:text-2xl pb-4 text-[#2B2B2B] text-xl'>Password Generator</h1>
            <input type="text"
            value={password} 
            placeholder='Password'
            className='w-11/12  bg-white h-14 outline-none px-2 rounded-lg placeholder:text-[#7A7A7A]'
            readOnly
            ref={passRef}
             />

             <div className='w-11/12 pt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 px-2 py-2 rounded-xl'>
                <div className=' bg-white flex flex-col-reverse justify-center items-center  rounded-xl py-1'>
                      <label htmlFor="length"
                      className='font-supreme text-md md:text-xl'
                      >Length:{length}</label>
                      <input type="range"
                      className='w-11/12 accent-[#6B7280]'
                      onChange={(e)=>setLength(e.target.value)}
                      id='length'
                      min='8'
                      max="30"
                       />
                </div>
                <div className='flex justify-center bg-white items-center  rounded-xl py-3'>
                    <label htmlFor="numbers" className='font-supreme px-3 text-md md:text-xl'>Numbers</label>
                    <input type="checkbox" name="numbers" id="numbers"
                    className='h-5 w-5 accent-slate-500 rounded-xl'
                    checked={numberAllowed}
                    onChange={()=>setNumberAllowed(prev => !prev)}
                     />
                     
                </div>
                <div className='flex bg-white justify-center items-center  rounded-xl py-3'>
                    <label htmlFor="characters"
                    className='font-supreme px-3 text-md md:text-xl'
                    >Characters</label>
                    <input type="checkbox" name="characters" id="characters"
                    className='h-5 w-5 accent-slate-500 rounded-xl'
                    defaultChecked={charAllowed}
                    onChange={()=>setCharAllowed(prev => !prev)}
                     />
                </div>
                <div className='flex col-span-full justify-center items-center pt-2'>
                    <button
                    className='w-full bg-[#CFCAC2]
                   hover:bg-indigo-50 h-full py-3 mb-3 rounded-xl font-supreme text-md md:text-xl  cursor-pointer flex justify-center items-center'
                   onClick={copyPassword}
                   
                    ><p
                    >
                      {btnText}
                    </p>
                    <i class="ri-file-copy-line"></i>
                    </button>
                </div>
             </div>
        </div>

    </div>
  )
}

export default App
