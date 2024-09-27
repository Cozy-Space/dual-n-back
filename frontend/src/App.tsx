import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IdInputPage } from './pages/IdInputPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<IdInputPage />} />
          {/*<Route path={'/prepare'} element={<PreparationPage />} />*/}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
