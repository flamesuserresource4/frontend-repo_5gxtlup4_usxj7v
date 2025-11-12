import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Navbar from './Navbar'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import CaseStudies from './pages/CaseStudies'
import Contact from './pages/Contact'
import './index.css'

function Site() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  </React.StrictMode>,
)
