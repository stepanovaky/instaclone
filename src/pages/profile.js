import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import {getUserByUsername }from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/header'
import UserProfile from '../components/profile/user-profile'

export default function Profile() {

    const { username } = useParams()
    const [user, setUser] = useState(null)
    const [userExists, setUserExists] = useState(false)
    const history = useHistory()

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username)
            console.log(user)
            if (user.length > 0) {
                setUser(user[0])
                setUserExists(true)
            } else {
                
                history.push(ROUTES.NOT_FOUND)
            }

        }

        checkUserExists()
    }, [username, history])

    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
            
                <UserProfile user={user} />
            </div>
        </div>
    ): null
}