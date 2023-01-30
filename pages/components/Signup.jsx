import React, { useEffect, useState } from "react"
import { useUser } from "@/lib/fetchHooks";
import Router from "next/router";

const Signup = () => {
    const [user, { mutate }] = useUser()
    const [errMsg, setErrMsg] = useState("")
    const [loading, isLoading] = useState(false)

    useEffect(() => {
        if (user) Router.replace("/")
    }, [user])

    const SubmitHandler = async (e) => {
        e.preventDefault()
        if (e.currentTarget.password.value !== e.currentTarget.password.value) {
            setErrMsg("Password doesn't match!")
        } else {
            isLoading(true)
            const body = {
                email: e.currentTarget.email.value,
                name: e.currentTarget.name.value,
                phone: e.currentTarget.phone.value,
                password: e.currentTarget.password.value
            }
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "appplication/json" },
                body: JSON.stringify(body)
            })
            if (res.status === 201) {
                const userObj = await res.json()
                mutate(userObj)
            } else {
                isLoading(false)
                setErrMsg(await res.text())
            }
        }
    }
}

export default Signup