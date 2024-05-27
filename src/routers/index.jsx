import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/Home'
import InsightEngine from '../pages/Insight'
import SentimentEngine from '../pages/Sentiment'
import Pricing from '../pages/Pricing'
import Settings from '../pages/Settings'
import Solutions from '../pages/Solutions'
import Scribe from '../pages/Scribe'
import Release from '../pages/Release'
import Translate from '../pages/Translate'


const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/insight-engine' element={<InsightEngine />} />
        <Route path='/sentiment-decoder' element={<SentimentEngine />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/solutions' element={<Solutions />} />
        <Route path='/voxscribe' element={<Scribe />} />
        <Route path='/voxrelease' element={<Release />} />
        <Route path='/voxtranslate' element={<Translate />} />
      </Route>
    </Routes>
  )
}

export default Routers
