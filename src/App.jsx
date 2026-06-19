import RegisterDoctor from './pages/RegisterDoctor';
import AssignSchedule from './pages/AssignSchedule';
import './App.css'; // <-- Importamos nuestro CSS separado

function App() {
  return (
    <div className="admin-layout">
      <h1 className="admin-title">Panel de Administración</h1>
      
      <hr className="admin-divider" />
      
      <div className="admin-content">
        <RegisterDoctor />
        <AssignSchedule />
      </div>
    </div>
  );
}

export default App;