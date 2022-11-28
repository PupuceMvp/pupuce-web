import './styles/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SendReport from "./pages/found/sendReport";

function App() {
    return (
        <Router>
            <Routes>
                {/*Homepage*/}
                <Route path="/" element={<HomePage />} />
                {/*Send report by pets founded*/}
                <Route
                    path="/found/:uid"
                    element={
                        <SendReport/>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
