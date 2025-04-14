import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const BuscarEmpresa = () => {
const [busqueda, setBusqueda] = useState('');
const [resultados, setResultados] = useState<any[]>([]);
const [cargando, setCargando] = useState(false);
const [editando, setEditando] = useState<any | null>(null);

useEffect(() => {
const fetchDatos = async () => {
    if (busqueda.trim() === '') {
    setResultados([]);
    return;
}

setCargando(true);
const { data, error } = await supabase
        .from('equipos')
        .select('*')
        .ilike('empresa', `%${busqueda}%`);

    if (error) {
        console.error('❌ Error al buscar:', error.message);
    } else {
        setResultados(data || []);
    }

    setCargando(false);
    };

    fetchDatos();
}, [busqueda]);

const handleEliminar = async (id: number) => {
    const confirmar = window.confirm('¿Estás segur@ de eliminar este registro?');
    if (!confirmar) return;

    const { error } = await supabase.from('equipos').delete().eq('id', id);

if (error) {
    alert('❌ Error al eliminar: ' + error.message);
    } else {
        alert('✅ Registro eliminado');
        setResultados(resultados.filter((r) => r.id !== id));
    }
};

const handleEditar = (item: any) => {
    setEditando(item);
};

  const handleGuardar = async () => {
    const { error } = await supabase
      .from('equipos')
      .update({
        empresa: editando.empresa,
        proceso: editando.proceso,
        os: editando.os,
        procesador: Number(editando.procesador),
        nucleos: Number(editando.nucleos),
        beneli: editando.beneli,
      })
      .eq('id', editando.id);

    if (error) {
      alert('❌ Error al guardar cambios: ' + error.message);
    } else {
      alert('✅ Cambios guardados');
      setEditando(null);
      // Actualizar los resultados sin volver a consultar todo
      setResultados(resultados.map((r) => (r.id === editando.id ? editando : r)));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔍 Buscar Empresa</h2>
      <input
        type="text"
        placeholder="Escribe el nombre de la empresa..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Buscando...</p>}

      {editando && (
        <div>
          <h3>✏️ Editar Registro</h3>
          <input
            type="text"
            value={editando.empresa}
            onChange={(e) => setEditando({ ...editando, empresa: e.target.value })}
            placeholder="Empresa"
          />
          <input
            type="text"
            value={editando.proceso}
            onChange={(e) => setEditando({ ...editando, proceso: e.target.value })}
            placeholder="Proceso"
          />
          <input
            type="text"
            value={editando.os}
            onChange={(e) => setEditando({ ...editando, os: e.target.value })}
            placeholder="OS"
          />
          <input
            type="number"
            value={editando.procesador}
            onChange={(e) => setEditando({ ...editando, procesador: e.target.value })}
            placeholder="Procesador"
          />
          <input
            type="number"
            value={editando.nucleos}
            onChange={(e) => setEditando({ ...editando, nucleos: e.target.value })}
            placeholder="Núcleos"
          />
          <input
            type="text"
            value={editando.beneli}
            onChange={(e) => setEditando({ ...editando, beneli: e.target.value })}
            placeholder="Beneli"
          />
          <button onClick={handleGuardar}>Guardar Cambios</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}

      {resultados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Proceso</th>
              <th>OS</th>
              <th>Procesador</th>
              <th>Núcleos</th>
              <th>Beneli</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((equipo) => (
              <tr key={equipo.id}>
                <td>{equipo.empresa}</td>
                <td>{equipo.proceso}</td>
                <td>{equipo.os}</td>
                <td>{equipo.procesador}</td>
                <td>{equipo.nucleos}</td>
                <td>{equipo.beneli}</td>
                <td>
                  <button onClick={() => handleEditar(equipo)}>✏️</button>
                  <button onClick={() => handleEliminar(equipo.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !cargando && busqueda && <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default BuscarEmpresa;
