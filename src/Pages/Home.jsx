import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Slider from '../Components/Slider'
import Content from '../Components/Content'

export default function Home() {
  return (
    <div>
        <NavBar />
        <Slider />
        <Content />
        <Footer />
    </div>
  )
}
