<header className="encabezado">
  <div className="logo">
    <img src="/logo-adosoft.svg" alt="ADOSOFT Logo" className="logo-img" />
    <span className="logo-text">ADOSOFT</span>
  </div>
</header>

import { useState } from 'react';
import supabase from './supabaseClient';
import BuscarEmpresa from './pages/BuscarEmpresa';
import './App.css'; // aquí estarán los estilos

function App() {
  const [formData, setFormData] = useState({
    empresa: '',
    proceso: '',
    os: '',
    procesador: '',
    nucleos: '',
    beneli: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('equipos').insert([{
      ...formData,
      procesador: Number(formData.procesador),
      nucleos: Number(formData.nucleos)
    }]);

    if (error) {
      alert('❌ Error al insertar: ' + error.message);
    } else {
      alert('✅ Registro guardado');
      setFormData({
        empresa: '',
        proceso: '',
        os: '',
        procesador: '',
        nucleos: '',
        beneli: ''
      });
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">ADOSOFT</header>

      <section className="buscar-section">
        <BuscarEmpresa />
      </section>

      <section className="form-section">
        <h2>Registrar equipo</h2>
        <form onSubmit={handleSubmit}>
          {['empresa', 'proceso', 'os', 'procesador', 'nucleos', 'beneli'].map((field) => (
            <div key={field} className="input-group">
              <label>{field}:</label>
              <input
                type="text"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-button">Guardar</button>
        </form>
      </section>
    </div>
  );
}

export default App;
