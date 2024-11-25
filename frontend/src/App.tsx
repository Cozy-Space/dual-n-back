import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IdInputPage } from './pages/IdInputPage'
import { PreparationPage } from './pages/PreparationPage'
import { GamePage } from './pages/GamePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ResultPage } from './pages/ResultPage'
import { ErrorPage } from './pages/ErrorPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { InstructionPage } from './pages/InstructionPage'

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={'/playground'} element={<PlaygroundPage />} />
            <Route path={'/'} element={<IdInputPage />} />
            <Route path={'/prepare'} element={<PreparationPage />} />
            <Route path={'/instruction'} element={<InstructionPage />} />
            <Route path={'/game'} element={<GamePage />} />
            <Route path={'/result'} element={<ResultPage />} />
            <Route path={'/error'} element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
