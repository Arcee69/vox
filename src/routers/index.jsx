import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/Home'
import InsightEngine from '../pages/Insight'
import SentimentEngine from '../pages/Sentiment'
import Pricing from '../pages/Pricing'
import Settings from '../pages/Settings'




const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/insight-engine' element={<InsightEngine />} />
        <Route path='/sentiment-decoder' element={<SentimentEngine />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default Routers
