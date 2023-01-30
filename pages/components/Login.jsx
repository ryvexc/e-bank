import { useUser } from '@/lib/fetchHooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'

const Login = () => {
  const router = useRouter()
  const [errMsg, setErrMsg] = useState("")
  const [user, { mutate }] = useUser()
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    if (user) router.replace("/")
  }, [user])

  const SubmitHandler = async (e) => {
    isLoading(true)
    e.preventDefault()
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      const usrObj = await res.json()
      mutate(usrObj)
    } else {
      isLoading(false)
      setErrMsg("Incorrect username or password. Try again!")
    }
  }

  // ini gausa di edit
  const labelsRef = [useRef(null), useRef(null), useRef(null)];
  const inputsRef = [useRef(null), useRef(null), useRef(null)];
  const setFocus = (e) => {
    labelsRef[parseInt(e.target.id)].current.classList.add("label-active");
    for (let i = 0; i < inputsRef.length; i++) if (i != e.target.id) inputsRef[i].current.style.transform = "scale(0.95)";
    for (let i = 0; i < labelsRef.length; i++) if (i != e.target.id) labelsRef[i].current.style.transform = "scale(0.95)";
    labelsRef[parseInt(e.target.id)].current.style.opacity = "1";
  }
  const setAbort = (e) => {
    labelsRef[parseInt(e.target.id)].current.classList.remove("label-active");
    for (let i = 0; i < inputsRef.length; i++) if (i != e.target.id) inputsRef[i].current.style.transform = "scale(1)";
    for (let i = 0; i < labelsRef.length; i++) if (i != e.target.id) labelsRef[i].current.style.transform = "scale(1)";
    labelsRef[parseInt(e.target.id)].current.style.opacity = e.target.value != "" ? "0" : "1";
  }

  return (<>
    <main className="login-page">
      <div className="sign-box">
        <div className="wrapper">
          <h1>Sign Up</h1>
          <div className="input-wrapper">
            <label className="label" ref={labelsRef[0]}>Full Name</label>
            <input id="0" ref={inputsRef[0]} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
            <label className="label" ref={labelsRef[1]}>Phone Number</label>
            <input id="1" ref={inputsRef[1]} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
            <label className="label" ref={labelsRef[2]}>Email Address</label>
            <input id="2" ref={inputsRef[2]} type="text" onFocus={e => setFocus(e)} onBlur={e => setAbort(e)} autoComplete="off" required />
          </div>
          <button onClick={e => SubmitHandler(e)}>Sign Up</button>
        </div>
      </div>
    </main>
  </>)
}

export default Login;