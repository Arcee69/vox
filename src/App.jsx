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
      apiKey: import.meta.env.VITE_HUME_API_KEY,
      clientSecret: import.meta.env.VITE_HUME_CLIENT_SECRET,
  });
  setToken(accessToken)
}
console.log(token, "samba");

useEffect(() => {
  fetchToken()
}, [])


  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  )
}

export default App

{/* <>
<VoiceProvider
  auth= {{type: 'accessToken', value: token }}
  configId={import.meta.env.VITE_HUME_CONFIG_ID}
>
  <Routers />

</VoiceProvider>
<ToastContainer />
</> */}


  // hostname='wss://api.hume.ai/v0/evi/chat'
  // onToolCall={(message) => console.log(message, "message")}
  // debug

  
  // const apiKey = '7CYwOIacYBk8VGpaZQFnY94GGJJPIIAhACshYx8i98qmtL3p'
  // const clientSecret = 'OtNVkHN9bImzJFtXpv7iNSRnxYMXAirn1rniJbolClVKcgolCFwG5ZtvsUwoMnhO'
  // configId='c2a5ce87-92af-4cf5-9c9f-004295ebd772'
