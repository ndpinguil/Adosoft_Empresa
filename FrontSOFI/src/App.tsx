import { useState } from 'react';
import supabase from './supabaseClient';

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

    const { error } = await supabase.from('CPU').insert([{
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
    <div style={{ padding: '2rem' }}>
      <h2>Registrar equipo</h2>
      <form onSubmit={handleSubmit}>
        {['empresa', 'proceso', 'os', 'procesador', 'nucleos', 'beneli'].map((field) => (
          <div key={field}>
            <label>{field}: </label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default App;
