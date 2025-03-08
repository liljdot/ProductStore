import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/useThemeStore"
import { Toaster } from "react-hot-toast"

function App() {

  const { theme } = useThemeStore()

  return (
    <>
      <div className="min-h-screen bg-base-200 transition-cololors duration-300" data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
