import './wdyr'


import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import FirebaseContext from "./context/firebase"
import { firebase, FieldValue } from "./lib/firebase"
import "./styles/app.css"

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
)

//client side rendered app: react
// => database which is firebase
// => react-loading-skeleton
// tailwind
//architecture => folder structure
// => components, constants, context, helpers, lib (firebase is going to live in here), services (firebase functions in here), services, styles (tailwind's folder(app/tailwind)), hooks
//all live within src
