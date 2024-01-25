import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Telegraph</span>
      <div className="user">
        <div className='Hambur'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Chiqish</button>
      </div>
    </div>
  )
}

export default Navbar