import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";

class ProfesorController {
    constructor() {}

    async consultarUno(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                return res.status(404).send("Profesor no encontrado");
            }
            res.status(200).json(registro);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al consultar el profesor");
        }
    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await Profesor.find();
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al consultar los profesores");
        }
    }

         async insertar(req: Request, res: Response) {
        const { dni, nombre, apellido, email, profesion, telefono } = req.body;
        const errores: { [key: string]: string } = {};




        // Validaciones
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = "El DNI debe contener exactamente 8 dígitos numéricos.";
        } else {
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente) {
                errores.dni = "Ya existe un profesor con este DNI.";
            }
        }

        if (!nombre || nombre.length < 3 || !/^[A-Za-z]+$/.test(nombre)) {
            errores.nombre = "El nombre es obligatorio y debe tener al menos 3 letras.";
        }

        if (!apellido || apellido.length < 3 || !/^[A-Za-z]+$/.test(apellido)) {
            errores.apellido = "El apellido es obligatorio y debe tener al menos 3 letras.";
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = "Debe ser un correo electrónico válido.";
        }

        if (!profesion || profesion.length < 3 || profesion.length > 100) {
            errores.profesion = "La profesión debe tener entre 3 y 100 caracteres.";
        }

        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = "El teléfono debe contener entre 7 y 15 dígitos numéricos.";
        }

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ errores });
        }

        try {
            const profesor = Profesor.create({ dni, nombre, apellido, email, profesion, telefono });
            await Profesor.save(profesor);
            res.status(201).json(profesor);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al insertar el profesor");
        }
    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                return res.status(404).send("Profesor no encontrado");
            }
            await Profesor.delete({ id: Number(id) });
            res.status(200).json({ mensaje: "Profesor eliminado exitosamente" });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al eliminar el profesor");
        }
    }

    async modificar(req: Request, res: Response) {
        const { id } = req.params;
        const { dni, nombre, apellido, email, profesion, telefono } = req.body;
        const errores: { [key: string]: string } = {};

        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = "El DNI debe contener exactamente 8 dígitos numéricos.";
        } else {
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente && profesorExistente.id !== Number(id)) {
                errores.dni = "Ya existe otro profesor con este DNI.";
            }
        }

        if (!nombre || nombre.length < 3 || !/^[A-Za-z]+$/.test(nombre)) {
            errores.nombre = "El nombre es obligatorio y debe tener al menos 3 letras.";
        }

        if (!apellido || apellido.length < 3 || !/^[A-Za-z]+$/.test(apellido)) {
            errores.apellido = "El apellido es obligatorio y debe tener al menos 3 letras.";
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = "Debe ser un correo electrónico válido.";
        }

        if (!profesion || profesion.length < 5 || profesion.length > 100) {
            errores.profesion = "La profesión debe tener entre 5 y 100 caracteres.";
        }

        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = "El teléfono debe contener entre 7 y 15 dígitos numéricos.";
        }

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ errores });
        }

        try {
            await Profesor.update(id, { dni, nombre, apellido, email, profesion, telefono });
            res.status(200).json({ mensaje: "Profesor actualizado exitosamente" });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al modificar el profesor");
        }
    }

   
}

export default new ProfesorController();
