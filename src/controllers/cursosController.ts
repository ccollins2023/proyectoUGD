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

         // Si hay errores, renderizamos el formulario con los errores
        if (Object.keys(errores).length > 0) {
            return res.render('insertarCurso', { errores, nombre, descripcion, profesor });
        }

        // Inserción en la base de datos
        try {
            const nuevoCurso = Curso.create({ nombre, descripcion, profesor: profesor || undefined });
            await nuevoCurso.save();
            res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
        } catch (error) {
            console.error('Error al crear curso:',error);
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
        const id = Number(req.params.id); // Usar Number para mayor claridad
        try {
            // Incluye la relación con profesor al buscar el curso
            const curso = await Curso.findOne({ 
                where: { id }, 
                relations: ['profesor'] // Asegúrate de incluir la relación
            });
            const profesores = await Profesor.find(); // Obtener lista de profesores
    
            if (curso) {
                res.render('editarCurso', { curso, profesores }); // Pasar curso y profesores a la vista
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener curso:', error);
            res.status(500).json({ message: 'Error al obtener curso' });
        }
    }
    

    async modificar(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { nombre, descripcion, profesor } = req.body;
        try {
            const curso = await Curso.findOne({ where: { id } });
            if (curso) {
                curso.nombre = nombre;
                curso.descripcion = descripcion;
    
                // Asegúrate de que el profesor esté definido
                const profesorEncontrado = await Profesor.findOne({ where: { id: profesor } });
                if (profesorEncontrado) {
                    curso.profesor = profesorEncontrado; // Asignar el objeto Profesor al curso
                } else {
                    return res.status(404).json({ message: 'Profesor no encontrado' });
                }
    
                await curso.save();
                res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar curso:', error);
            res.status(500).json({ message: 'Error al actualizar curso' });
        }
    }
    
    

    async eliminar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            // Verificamos que el curso exista
            const curso = await Curso.findOneBy({ id });
            if (!curso) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
    
            // Intentamos eliminar el curso
            await curso.remove();
            res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
        } catch (error) {
            console.error('Error al eliminar curso:', error);
            res.status(500).json({ message: 'Error al eliminar curso' });
        }
    }
    
    
}

export default new cursosController();
