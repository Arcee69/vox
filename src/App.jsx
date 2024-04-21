import { useState } from 'react'
import './App.css'
import Routers from './routers'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'

function App() {

  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  )
}

export default App
