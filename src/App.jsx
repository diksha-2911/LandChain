import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConnectPage from './pages/ConnectPage'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
