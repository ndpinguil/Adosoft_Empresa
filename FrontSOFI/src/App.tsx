import { useState } from 'react';
import supabase from './supabaseClient';
import BuscarEmpresa from './pages/BuscarEmpresa';
import './App.css';

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
      <header className="barra-header fade-in">
        <div className="texto-header">
          <span className="logo-text">ADOSOFT</span>
          <span className="logo-subtext">Sistema de Registro Empresarial</span>
        </div>
      </header>

      <main className="contenido-principal">
        <section className="lado-izquierdo">
          <BuscarEmpresa />
        </section>

        <section className="lado-derecho">
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
      </main>
    </div>
  );
}

export default App;
