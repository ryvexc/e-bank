import { useCurrentUser } from "@/lib/fetchHooks";
import { getUser } from "@/lib/userdb";
import middleware from "@/middlewares/middleware";
import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const UserPage = ({ user }) => {
    if (!user) return <Error statusCode={404} />
    const { name, email, bio, profilePicture } = user || {}
    const [currentUser] = useCurrentUser()
    const isCurrentUser = currentUser?._id == user?._id
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 p3 d-flex align-items-center">
                        <img src={profilePicture} className="img-fluid border border-2" style={{ height: 'auto' }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title text-center">Profile</h3>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className="card-title">Name</h3>
                                    <div className="card-text">{name}</div>
                                </div>

                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className="card-title">Bio</h3>
                                    <div className="card-text">{bio}</div>
                                </div>

                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className="card-title">Email</h3>
                                    <div className="card-text">{email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='card-action text-center mb-3'>
                            <Link href='/'><a className='btn btn-primary'>Edit</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    await middleware.apply(context.req, context.res)
    const user = await getUser(context.req, context.params.userId)
    if (!user) context.res.statusCode = 404
    return {
        props: { user }
    }
}

export default UserPage;