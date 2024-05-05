import { useEffect, useState } from 'react'
import './App.css'
import Routers from './routers'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'


import { fetchAccessToken } from "@humeai/voice"
import { VoiceProvider } from '@humeai/voice-react';


function App() {
  const [token, setToken] = useState("")


  const fetchToken = async () => {
    const accessToken = await fetchAccessToken({
      apiKey: `7CYwOIacYBk8VGpaZQFnY94GGJJPIIAhACshYx8i98qmtL3p`,
      clientSecret: 'OtNVkHN9bImzJFtXpv7iNSRnxYMXAirn1rniJbolClVKcgolCFwG5ZtvsUwoMnhO',
  });
  setToken(accessToken)
}
console.log(token, "samba");

useEffect(() => {
  fetchToken()
}, [])

  const apiKey = '7CYwOIacYBk8VGpaZQFnY94GGJJPIIAhACshYx8i98qmtL3p'

  return (
    <>
      <VoiceProvider
          auth= {{type: 'accessToken', value: token }}
          // hostname='wss://api.hume.ai/v0/evi/chat'
          configId='c2a5ce87-92af-4cf5-9c9f-004295ebd772'
          onToolCall={(message) => console.log(message, "message")}
          // debug
      >
        <Routers />

      </VoiceProvider>
      <ToastContainer />
    </>
  )
}

export default App
