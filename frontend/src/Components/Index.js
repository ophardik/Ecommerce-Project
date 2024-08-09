import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Client from './Client'
import About from './About'
import Stats from './Stats'
import Pricing from './Pricing'
import Section from './Services'
import Portfolio from './Portfolio'
// import AddToCart from './AddToCart'
import Contact from './Contact'
import Signup from './Signup'
import Login from './Login'

function Index() {
  return (
    <>
    <Header></Header>
    <Hero></Hero>
    <Client></Client>
    <About></About>
    <Stats></Stats>
    <Portfolio></Portfolio>
    {/* <Signup></Signup> */}
    <Section></Section>
    <Pricing></Pricing>
    {/* <Login></Login> */}
    {/* <AddToCart></AddToCart> */}
    <Contact></Contact>
    </>
  )
}

export default Index
