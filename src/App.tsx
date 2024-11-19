import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrderPage from './pages/OrderPage'

function App() {
  return (
    <Routes>
      <Route path='/order/checkout' element={<OrderPage/>} />
      <Route path='*' element={<Navigate to={'/order/checkout'}/>} />
    </Routes>
  )
}

export default App
