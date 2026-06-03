import Cursor from '@/components/Cursor'
import StarField from '@/components/StarField'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Pricing from '@/components/Pricing'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <>
      <Cursor />
      <StarField />
      <Nav />
      <Chatbot />
      <main>
        <Hero />
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.45), transparent)' }} />
        <Problem />
        <Services />
        <Process />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
