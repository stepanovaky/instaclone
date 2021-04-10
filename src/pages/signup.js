import React, { useEffect, useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"
import { doesUserNameExist} from '../services/firebase'

export default function SignUp() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [userName, setUserName] = useState("")
  const [fullName, setFullName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const isInvalid = password === "" || emailAddress === ""
    const handleSignup = async (event) => {
        event.preventDefault()
      
        const userNameExists = await doesUserNameExist(userName)
        if (!userNameExists.length) {
            try {
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password)

                await createdUserResult.user.updateProfile({
                    displayName: userName
                })

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase,
                    fullName,
                    emailAddress: emailAddress.toLowerCase,
                    following: [],
                    dateCreated: Date.now(),
                })

                history.push(ROUTES.DASHBOARD)

            } catch (err) {
                setFullName('')
                setEmailAddress('')
                setPassword('')

            }
        } else {
            setError('That username is already taken, please try another.')
        }
    }


  useEffect(() => {
    document.title = "Sign Up - Instagram"
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with backdrop" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt2 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                  <form onSubmit={handleSignup} method="POST">
                       <input
              aria-label="Enter your full name"
              value={fullName}
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
            />
             <input
              aria-label="Enter your username"
              value={userName}
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
            />    
            <input
              aria-label="Enter your email address"
              value={emailAddress}
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your password"
              value={password}
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disable={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
