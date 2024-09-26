import { Request, Response } from 'express';
import { Curso } from '../models/cursoModel';
import { Profesor } from '../models/profesorModel';

class cursosController  {

    async insertar(req: Request, res: Response) {
        const { nombre, descripcion, profesor } = req.body;
        const errores: { nombre?: string, descripcion?: string, profesor?: string } = {};

        // Validación simple
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        }
        if (!descripcion) {
            errores.descripcion = 'La descripción es obligatoria.';
        }
        if (!profesor) {
            errores.profesor = 'El profesor es obligatorio.';
        }

        if (Object.keys(errores).length > 0) {
            return res.render('insertarCurso', { errores, nombre, descripcion, profesor });
        }

        try {
            const nuevoCurso = Curso.create({ nombre, descripcion, profesor: profesor || undefined });
            await nuevoCurso.save();
            res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear curso' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const cursos = await Curso.find();
            res.render('listarCursos', { cursos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener cursos' });
        }
    }

    async editar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const curso = await Curso.findOneBy({ id });
            if (curso) {
                res.render('editarCurso', { curso });
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener curso' });
        }
    }

    async modificar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, profesor } = req.body;
        try {
            const curso = await Curso.findOneBy({ id });
            if (curso) {
                curso.nombre = nombre;
                curso.descripcion = descripcion;
                curso.profesor = profesor;
                await curso.save();
                res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar curso' });
        }
    }

    async eliminar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const curso = await Curso.findOneBy({ id });
            if (curso) {
                await curso.remove();
                res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar curso' });
        }
    }
}

export default new cursosController();
