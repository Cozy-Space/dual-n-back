import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IdInputPage } from './components/IdInputPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<IdInputPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
