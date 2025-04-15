    import React from 'react';
    import './FormularioEdicion.css'; 
    import { useForm, Controller } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';

    interface FormData {
    empresa: string;
    proceso: string;
    os: string;
    procesador: number;
    nucleos: number;
    beneli: string;
    }

    // Esquema de validación con Yup
    const schema = yup.object().shape({
    empresa: yup.string().required('La empresa es obligatoria'),
    proceso: yup.string().required('El proceso es obligatorio'),
    os: yup.string().required('El sistema operativo es obligatorio'),
    procesador: yup.number().positive('El procesador debe ser un número positivo').required('El procesador es obligatorio'),
    nucleos: yup.number().positive('Los núcleos deben ser un número positivo').required('El número de núcleos es obligatorio'),
    beneli: yup.string().required('El campo Beneli es obligatorio'),
    });

    interface FormularioEdicionProps {
    defaultValues: FormData;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    }

    const FormularioEdicion: React.FC<FormularioEdicionProps> = ({ defaultValues, onSubmit, onCancel }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues,
        resolver: yupResolver(schema), // Aplicamos el validador de yup
    });

    return (
        <div>
        <h3>✏️ Editar Equipo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label>Empresa</label>
            <Controller
                name="empresa"
                control={control}
                render={({ field }) => <input {...field} />}
            />
            {errors.empresa && <p>{errors.empresa.message}</p>}
            </div>

            <div>
            <label>Proceso</label>
            <Controller
                name="proceso"
                control={control}
                render={({ field }) => <input {...field} />}
            />
            {errors.proceso && <p>{errors.proceso.message}</p>}
            </div>

            <div>
            <label>OS</label>
            <Controller
                name="os"
                control={control}
                render={({ field }) => <input {...field} />}
            />
            {errors.os && <p>{errors.os.message}</p>}
            </div>

            <div>
            <label>Procesador</label>
            <Controller
                name="procesador"
                control={control}
                render={({ field }) => <input type="number" {...field} />}
            />
            {errors.procesador && <p>{errors.procesador.message}</p>}
            </div>

            <div>
            <label>Núcleos</label>
            <Controller
                name="nucleos"
                control={control}
                render={({ field }) => <input type="number" {...field} />}
            />
            {errors.nucleos && <p>{errors.nucleos.message}</p>}
            </div>

            <div>
            <label>Beneli</label>
            <Controller
                name="beneli"
                control={control}
                render={({ field }) => <input {...field} />}
            />
            {errors.beneli && <p>{errors.beneli.message}</p>}
            </div>

            <div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
        </div>
    );
    };

    export default FormularioEdicion;
