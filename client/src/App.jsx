import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Material from './pages/Material'
import About from './pages/About'
import Semester1 from './pages/semester/Semester1'
import Semester2 from './pages/semester/Semester2'
import Semester3 from './pages/semester/Semester3'
import Semester4 from './pages/semester/Semester4'
import Admin from './pages/admin/Admin'

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
      <Route path='/semester-3' element={<Semester3/>} />
      <Route path='/semester-4' element={<Semester4/>} />
      <Route path='/admin' element={<Admin/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App