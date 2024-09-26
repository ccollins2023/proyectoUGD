import { Request, Response } from "express";
import { Estudiante } from "../models/estudianteModel";

class EstudiantesController {
    constructor() {}

    async consultarUno(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await Estudiante.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

  

    async insertar(req: Request, res: Response) {
        const { dni, nombre, apellido, email } = req.body;
        const errores: { [key: string]: string } = {};

        // Validaciones
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        } else {
            const estudianteExistente = await Estudiante.findOneBy({ dni });
            if (estudianteExistente) {
                errores.dni = 'El DNI ya está registrado para otro estudiante.';
            }
        }

        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        } else {
            if (nombre.length < 3) {
                errores.nombre = 'El nombre debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras.';
            }
        }

        if (!apellido) {
            errores.apellido = 'El apellido es obligatorio.';
        } else {
            if (apellido.length < 3) {
                errores.apellido = 'El apellido debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = 'El apellido solo puede contener letras.';
            }
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electrónico válido.';
        }
            
        if (Object.keys(errores).length > 0) {
            return res.render('insertarEstudiante', { errores, dni, nombre, apellido, email });
        }

        try {
            const estudiante = Estudiante.create({ dni, nombre, apellido, email });
            await Estudiante.save(estudiante);
            res.redirect('/estudiantes/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Estudiante.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Estudiante.delete({ id: Number(id) });
            res.redirect('/estudiantes/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }


    async modificar(req: Request, res: Response) {
        const { id, dni, nombre, apellido, email } = req.body;
        const errores: { [key: string]: string } = {};

        // Validar DNI
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        } else {
            const estudianteExistente = await Estudiante.findOneBy({ dni });
            if (estudianteExistente && estudianteExistente.id !== Number(id)) {
                errores.dni = 'El DNI ya está registrado para otro estudiante.';
            }
        }

        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        } else {
            if (nombre.length < 3) {
                errores.nombre = 'El nombre debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras.';
            }
        }

        if (!apellido) {
            errores.apellido = 'El apellido es obligatorio.';
        } else {
            if (apellido.length < 3) {
                errores.apellido = 'El apellido debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = 'El apellido solo puede contener letras.';
            }
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electrónico válido.';
        }

        if (Object.keys(errores).length > 0) {
            const estudiante = await Estudiante.findOneBy({ id: Number(id) });
            return res.render('editarEstudiante', { errores, estudiante });
        }

        try {
            await Estudiante.update(id, { dni, nombre, apellido, email });
            res.redirect('/estudiantes/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const estudiantes = await Estudiante.find();
            res.render('listarEstudiantes', { estudiantes });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const estudiante = await Estudiante.findOneBy({ id: Number(id) });
            if (!estudiante) {
                return res.status(404).send('Estudiante no encontrado');
            }
            res.render('editarEstudiante', { estudiante });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    
}

export default new EstudiantesController();
