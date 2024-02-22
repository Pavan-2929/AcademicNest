import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Material from './pages/Material'
import About from './pages/About'
import Semester1 from './pages/semester/Semester1'
import Semester2 from './pages/semester/Semester2'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Material/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/semester-1' element={<Semester1/>} />
      <Route path='/semester-2' element={<Semester2/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App