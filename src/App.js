import { Routes, Route } from 'react-router-dom';

import FormProfile from './components/Profile/Profile';
import Login from './components/Login/Login';

import './App.css';

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<FormProfile />} />
            </Routes>
        </div>
    );
}

export default App;
