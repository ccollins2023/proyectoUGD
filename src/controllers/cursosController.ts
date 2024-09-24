import { Request, Response } from 'express';
import { Curso } from '../models/cursoModel';

const cursosController = {

    insertar: async (req: Request, res: Response) => {
        const { nombre, descripcion, profesor } = req.body;
        try {
            const nuevoCurso = Curso.create({ nombre, descripcion, profesor });
            await nuevoCurso.save();
            res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear curso' });
        }
    },

    listar: async (req: Request, res: Response) => {
        try {
            const cursos = await Curso.find();
            res.render('listarCursos', { cursos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener cursos' });
        }
    },

  

    editar: async (req: Request, res: Response) => {
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
    },

    modificar: async (req: Request, res: Response) => {
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
    },

    eliminar: async (req: Request, res: Response) => {
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
};

export default cursosController;
