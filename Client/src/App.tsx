import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
function App() {

  return (
    <>
      <div className="min-h-screen bg-base-200 transition-cololors duration-300" data-theme="luxury">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
