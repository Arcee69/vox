import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/Home'
import InsightEngine from '../pages/Insight'
import SentimentEngine from '../pages/Sentiment'


const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/insight-engine' element={<InsightEngine />} />
        <Route path='/sentiment-engine' element={<SentimentEngine />} />
      </Route>
    </Routes>
  )
}

export default Routers
