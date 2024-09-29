import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IdInputPage } from './pages/IdInputPage'
import { PreparationPage } from './pages/PreparationPage'
import { GamePage } from './pages/GamePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<IdInputPage />} />
            <Route path={'/prepare'} element={<PreparationPage />} />
            <Route path={'/game'} element={<GamePage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
