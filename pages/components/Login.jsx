import { useUser } from '@/lib/fetchHooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'

const Login = () => {
  const router = useRouter()
  const [errMsg, setErrMsg] = useState("")
  const [user, { mutate }] = useUser()
  const [loading, isLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (user) router.replace("/")
  }, [user])

  const SignUpSubmitHandler = async (e) => {
    isLoading(true)
    e.preventDefault()
    if (password !== password) {
      setErrMsg("Password doesn't match!")
    } else {
      isLoading(true)
      const body = {
        email: email,
        name: name,
        phone: phone,
        password: password
      }
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "appplication/json" },
        body: JSON.stringify(body)
      })
      if (res.status === 201) {
        const userObj = await res.json()
        console.log(userObj)
        mutate(userObj)
      } else {
        isLoading(false)
        setErrMsg(await res.text())
      }
    }
  }

  const SignInSubmitHandler = async (e) => {
    isLoading(true)
    e.preventDefault()
    const body = {
      email,
      password
    }
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      const usrObj = await res.json()
      console.log(userObj)
      mutate(usrObj)
    } else {
      isLoading(false)
      setErrMsg("Incorrect username or password. Try again!")
    }
  }

  const SignUp = () => {
    return <>
      <h1>Sign Up</h1>
      <div className="input-wrapper">
        <label className="label" ref={labelsRef[0]}>Full Name</label>
        <input id="0" ref={inputsRef[0]} onChange={(e) => setName(e.target.value)} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
        <label className="label" ref={labelsRef[1]}>Phone Number</label>
        <input id="1" ref={inputsRef[1]} onChange={(e) => setPhone(e.target.value)} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
        <label className="label" ref={labelsRef[2]}>Email Address</label>
        <input id="2" ref={inputsRef[2]} onChange={(e) => setEmail(e.target.value)} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
        <label className="label" ref={labelsRef[3]}>Password</label>
        <input id="3" ref={inputsRef[3]} onChange={(e) => setPassword(e.target.value)} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
      </div>
      <button onClick={e => SignUpSubmitHandler(e)} className="global-button-prop">Sign Up</button>
      <p className='link' onClick={e => linkOnclick(e)}>Already have account? Sign In</p>
    </>
  }

  const SignIn = () => {
    return <>
      <h1>Sign In</h1>
      <div className="input-wrapper">
        <label className="label" ref={labelsRef[0]}>Email Address</label>
        <input id="0" ref={inputsRef[0]} type="text" onChange={(e) => setEmail(e.target.value)} onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
        <label className="label" ref={labelsRef[1]}>Password</label>
        <input id="1" ref={inputsRef[1]} type="text" onChange={(e) => setPassword(e.target.value)} onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
      </div>
      <button onClick={e => SignInSubmitHandler(e)}>Sign In</button>
      <p className='link' onClick={e => linkOnclick(e)}>Just Register? Sign Up</p>
    </>
  }

  let isSignIn = false;
  const boxLogin = useRef(null);
  const boxState = useRef(null);
  const [loginBoxState, setLoginBoxState] = useState(<SignUp />);
  const linkOnclick = async (e) => {
    boxLogin.current.style.width = "0px";
    boxState.current.style.opacity = "0";
    await new Promise(resolve => setTimeout(resolve, 100));
    boxState.current.style.display = "none";
    await new Promise(resolve => setTimeout(resolve, 100));
    boxState.current.style.opacity = "1";
    await new Promise(resolve => setTimeout(resolve, 100));
    boxState.current.style.display = "block";

    if (isSignIn) {
      console.log("Spawning SignUP");
      setLoginBoxState(<SignUp />);
      isSignIn = false;
    }
    else {
      console.log("Spawning SignIN");
      setLoginBoxState(<SignIn />);
      isSignIn = true;
    }
    boxLogin.current.style.width = "400px";
  }

  const labelsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const setFocus = (e) => {
    console.log(isSignIn);
    labelsRef[parseInt(e.target.id)].current.classList.add("label-active");
    for (let i = 0; i < (isSignIn ? 1 : inputsRef.length); i++) if (i != e.target.id) inputsRef[i].current.style.transform = "scale(0.95)";
    labelsRef[parseInt(e.target.id)].current.style.opacity = "1";
  }
  const setAbort = (e) => {
    labelsRef[parseInt(e.target.id)].current.classList.remove("label-active");
    for (let i = 0; i < (isSignIn ? 1 : inputsRef.length); i++) if (i != e.target.id) inputsRef[i].current.style.transform = "scale(1)";
    labelsRef[parseInt(e.target.id)].current.style.opacity = e.target.value != "" ? "0" : "1";
  }

  return (<>
    <main className="login-page">
      <div className="sign-box" ref={boxLogin}>
        <div className="wrapper" ref={boxState}>
          {loginBoxState}
        </div>
      </div>
    </main>
  </>)
}

export default Login;