import './App.css'
import Home from './pages/Home'
import { SearchProvider } from './state/context'

function App() {
  return (
    <SearchProvider>
      <Home />
    </SearchProvider>
  )
}

export default App
