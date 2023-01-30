import { useUser } from '@/lib/fetchHooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Signin = () => {
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
}

export default Signin