import React, { useState } from 'react';
import supabase from '../supabaseClient';  // Asegúrate de importar correctamente el cliente de Supabase

    const FormularioIngreso = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Enviar los datos a la base de datos Supabase
        const { data, error } = await supabase
        .from('usuarios')  // Aquí usa el nombre de tu tabla en Supabase
        .insert([
            {
            nombre: nombre,
            email: email
            }
        ]);

        if (error) {
        console.error('Error al ingresar los datos:', error);
        } else {
        console.log('Datos ingresados con éxito:', data);
        // Limpiar el formulario después de un ingreso exitoso
        setNombre('');
        setEmail('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>Nombre:</label>
            <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <button type="submit">Enviar</button>
        </form>
    );
    };

export default FormularioIngreso;
