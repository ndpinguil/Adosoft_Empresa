import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

// Interfaz para el formulario y para los registros
interface Equipo {
  id?: number; // opcional porque no se usa al registrar
  empresa: string;
  proceso?: string | null;
  os: string;
  procesador: number;
  nucleos: number;
  beneli?: string | null;
}

const FormularioIngreso: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Equipo, 'id'>>({
    empresa: '',
    proceso: '',
    os: '',
    procesador: 0,
    nucleos: 0,
    beneli: ''
  });

  const [equipos, setEquipos] = useState<Equipo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // convertir valores numéricos si corresponde
    const numericFields = ['procesador', 'nucleos'];
    const parsedValue = numericFields.includes(name)
      ? Number(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { empresa, os, procesador, nucleos } = formData;

    if (!empresa || !os || !procesador || !nucleos) {
      alert('Por favor, completa los campos obligatorios: empresa, procesador, núcleos y sistema operativo.');
      return;
    }

    if (isNaN(procesador) || isNaN(nucleos)) {
      alert('Procesador y núcleos deben ser números válidos.');
      return;
    }

    const { error } = await supabase.from('equipos').insert([
      {
        ...formData,
        proceso: formData.proceso || null,
        beneli: formData.beneli || null
      }
    ]);

    if (error) {
      alert('❌ Error al insertar: ' + error.message);
      console.error(error);
    } else {
      alert('✅ Registro guardado con éxito');
      setFormData({
        empresa: '',
        proceso: '',
        os: '',
        procesador: 0,
        nucleos: 0,
        beneli: ''
      });
      fetchEquipos();
    }
  };

  const fetchEquipos = async () => {
    const { data, error } = await supabase.from('equipos').select('*');
    if (data && !error) {
      setEquipos(data as Equipo[]);
    } else {
      console.error('Error al obtener equipos:', error?.message);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Registro de Equipos</h2>
        <div><label>Empresa:</label><input name="empresa" value={formData.empresa} onChange={handleChange} required /></div>
        <div><label>Proceso:</label><input name="proceso" value={formData.proceso || ''} onChange={handleChange} /></div>
        <div><label>Sistema Operativo:</label><input name="os" value={formData.os} onChange={handleChange} required /></div>
        <div><label>Procesador:</label><input name="procesador" type="number" value={formData.procesador} onChange={handleChange} required /></div>
        <div><label>Núcleos:</label><input name="nucleos" type="number" value={formData.nucleos} onChange={handleChange} required /></div>
        <div><label>Beneli:</label><input name="beneli" value={formData.beneli || ''} onChange={handleChange} /></div>
        <button type="submit">Guardar</button>
      </form>

      <h2>Equipos Registrados</h2>
      <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Proceso</th>
            <th>Sistema Operativo</th>
            <th>Procesador</th>
            <th>Núcleos</th>
            <th>Beneli</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((eq) => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.empresa}</td>
              <td>{eq.proceso}</td>
              <td>{eq.os}</td>
              <td>{eq.procesador}</td>
              <td>{eq.nucleos}</td>
              <td>{eq.beneli}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormularioIngreso;
