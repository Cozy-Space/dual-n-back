import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IdInputPage } from './pages/IdInputPage'
import { PreparationPage } from './pages/PreparationPage'
import { GamePage } from './pages/GamePage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<IdInputPage />} />
          <Route path={'/prepare'} element={<PreparationPage />} />
          <Route path={'/game'} element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
