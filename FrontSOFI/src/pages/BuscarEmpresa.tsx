import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import FormularioEdicion from '../components/FormularioEdicion';

interface Equipo {
  id: number;
  empresa: string;
  proceso: string;
  os: string;
  procesador: number;
  nucleos: number;
  beneli: string;
}

const BuscarEmpresa = () => {
  const [empresa, setEmpresa] = useState('');
  const [resultados, setResultados] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [editando, setEditando] = useState<Equipo | null>(null);

  const handleBuscar = async () => {
    if (empresa.trim() === '') {
      setResultados([]);
      return;
    }

    setCargando(true);
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .ilike('empresa', `%${empresa}%`);

    if (error) {
      alert('❌ Error al buscar: ' + error.message);
    } else {
      setResultados(data as Equipo[] || []);
    }
    setCargando(false);
  };

  useEffect(() => {
    handleBuscar();
  }, [empresa]);

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

  const handleEditar = (item: Equipo) => {
    setEditando(item);
  };

  return (
    <div className="buscar-container" style={{ padding: '2rem' }}>
      <h2>🔍 Buscar Empresa</h2>
      <input
        type="text"
        placeholder="Escribe el nombre de la empresa..."
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="buscar-input"
      />

      {cargando && <p>Buscando...</p>}

      {editando && (
        <FormularioEdicion
          defaultValues={editando}
          onSubmit={async (data) => {
            const { error } = await supabase
              .from('equipos')
              .update(data)
              .eq('id', editando.id);

            if (error) {
              alert('❌ Error al guardar cambios: ' + error.message);
            } else {
              alert('✅ Cambios guardados');
              setEditando(null);
              handleBuscar();
            }
          }}
          onCancel={() => setEditando(null)}
        />
      )}

      {resultados.length > 0 ? (
        <table className="tabla-elegante">
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
            {resultados.map((item) => (
              <tr key={item.id}>
                <td>{item.empresa}</td>
                <td>{item.proceso}</td>
                <td>{item.os}</td>
                <td>{item.procesador}</td>
                <td>{item.nucleos}</td>
                <td>{item.beneli}</td>
                <td>
                  <button onClick={() => handleEditar(item)}>✏️</button>
                  <button onClick={() => handleEliminar(item.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !cargando && empresa && <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default BuscarEmpresa;
