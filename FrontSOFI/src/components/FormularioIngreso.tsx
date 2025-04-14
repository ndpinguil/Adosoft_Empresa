import React, { useState } from 'react';
import supabase from '../supabaseClient';

const FormularioIngreso = () => {
const [formData, setFormData] = useState({
    empresa: '',
    proceso: '',
    os: '',
    procesador: '',
    nucleos: '',
    beneli: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

console.log('Datos a insertar:', formData);

const { error } = await supabase.from('equipos').insert([
    {
        ...formData,
        procesador: Number(formData.procesador),
        nucleos: Number(formData.nucleos)
    }
]);

if (error) {
    alert('❌ Error al insertar: ' + error.message);
    console.error(error);
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
    <form onSubmit={handleSubmit}>
        <div>
            <label>Empresa:</label>
            <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
            />
        </div>

        <div>
            <label>Proceso:</label>
            <input
            type="text"
            name="proceso"
            value={formData.proceso}
            onChange={handleChange}
            />
        </div>

        <div>
            <label>Sistema Operativo:</label>
            <input
            type="text"
            name="os"
            value={formData.os}
            onChange={handleChange}
            />
        </div>

        <div>
            <label>Procesador:</label>
            <input
            type="number"
            name="procesador"
            value={formData.procesador}
            onChange={handleChange}
            />
        </div>

        <div>
            <label>Núcleos:</label>
            <input
            type="number"
            name="nucleos"
            value={formData.nucleos}
            onChange={handleChange}
            />
        </div>

        <div>
            <label>Beneli:</label>
            <input
            type="text"
            name="beneli"
            value={formData.beneli}
            onChange={handleChange}
            />
        </div>

        <button type="submit">Guardar</button>
        </form>
    );
};

export default FormularioIngreso;
