import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Material from './pages/Material'
import About from './pages/About'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Material/>}/>
      <Route path='/about' element={<About/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App