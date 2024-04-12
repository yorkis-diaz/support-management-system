import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import FormComponent from './components/SupportForm';
import AdminDashboardComponent from './components/AdminDashboard';
import NavComponent from './components/NavComponent';


function App() {
  return (
    <Router>
      <header className='App-header'>
        <h1>Support Ticket System</h1>
      </header>
      <div>
        <NavComponent />

        <Routes>
          <Route path="/" Component={FormComponent} />
          <Route path="/admin" Component={AdminDashboardComponent} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
