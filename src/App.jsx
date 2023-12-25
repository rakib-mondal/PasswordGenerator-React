import React, { useCallback,useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [length, setlength] = useState(8);
  const [isNumber, setisNumber] = useState(false);
  const [isCharacter, setisCharacter] = useState(false);
  const [password, setpassword] = useState("");
  const[isalphabets,setIsalphabets]=useState(true)

  const passwordRef=useRef(null);
  const passwordGenerator=  useCallback(
    () => {
      let pass=""
      let str=""
    
      if(isNumber)str+="0123456789"
      if(isalphabets)str+="ABCDEFGHIJKLAMNOPQRSTUVWXTYZabcdefghijklmnopqrstuvwxyz"
      if(isCharacter)str+="!@#$%^&*()_-=+{[}}/?><.,:;'"
      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char);
      }
      setpassword(pass);
    },
    [length,isNumber,isCharacter,isalphabets,setpassword],
  )
  const copyPassword=()=>{

    try {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
      if(password===""){
        toast.warning("No Password Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      else{
        toast.success("Copied Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    }
    catch(err) {
      toast.error("Failed To Copy !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  // useEffect(() => {

  // passwordGenerator()
   
  // }, [length,isCharacter,isNumber,passwordGenerator]) Without using button 
  
  return (
    <div className="h-full  md:h-screen flex bg-slate-950 justify-center items-center font-mono">
          <div className="bg-slate-900 w-[500px] text-center h-3/4 rounded-lg p-10">
          <h1 className="text-4xl text center text-white mb-7">Password Generator</h1>
          <div className="flex flex-col justify-around items-center text-white">
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                  <input type="text " readOnly value={password} className="outline-none w-full py-1 px-3 text-black" placeholder='Password' ref={passwordRef}/>
                  <button className='bg-slate-800 p-2 uppercase hover:bg-slate-700'
                  onClick={copyPassword}
                   >copy</button>
                   <ToastContainer />
                </div>
                <div className="flex-col text-sm gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <input type="range" min={8} max={20} value={length} className='cursor-pointer'onChange={(e)=>setlength(e.target.value)} />
                    <label className='font-mono'> Length : {length}</label>
                    </div>
                    <div className='flex my-5 items-center'>
                    <input type="checkbox" defaultChecked={isNumber} id="number" onChange={()=>setisNumber((prev)=>!prev)}/>
                    <label htmlFor="number"> Include Numbers</label>
                    </div>
                    <div className='flex my-5 items-center'>
                    <input type="checkbox" defaultChecked={isalphabets} id="alphabets" onChange={()=>setIsalphabets((prev)=>!prev)}/>
                    <label htmlFor="alphabets"> Include Alphabets</label>
                    </div>
                    <div className='flex  items-center'>
                    <input type="checkbox" defaultChecked={isCharacter} id="character" onChange={()=>setisCharacter((prev)=>!prev)}/>
                    <label htmlFor="character">Include Characters</label>
                    </div>
                    <button className='bg-slate-950 p-2 my-4 rounded-lg font-sans font-bold hover:bg-slate-700 ' onClick={passwordGenerator}>Generate</button>
                </div>
          </div>
          </div>
    </div>
  )
}

export default App