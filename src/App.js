import './styles/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Portal from "./pages/portal/Portal";

function App() {
    return (
        <Router>
            <Routes>
                {/*Homepage*/}
                <Route path="/" element={<HomePage />} />
                {/*Action portal for pet*/}
                <Route
                    path="/portal/:uid"
                    element={
                        <Portal/>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
