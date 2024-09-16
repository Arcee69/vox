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
import Prompt from '../pages/Prompt'


const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/vox-reputation' element={<InsightEngine />} />
        <Route path='/vox-sentiment' element={<SentimentEngine />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/solutions' element={<Solutions />} />
        <Route path='/voxscribe' element={<Scribe />} />
        <Route path='/voxrelease' element={<Release />} />
        <Route path='/voxover' element={<Translate />} />
        <Route path='/voxprompt' element={<Prompt />} />
      </Route>
    </Routes>
  )
}

export default Routers
