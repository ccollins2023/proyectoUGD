import { Router } from 'express';
import { Profesor } from '../models/profesorModel';
import ProfesorController from '../controllers/profesorController';

const router = Router();

// Obtener todos los profesores y renderizar la lista
router.get('/listar', async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.render('listarProfesores', { profesores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener profesores' });
    }
});

// Obtener un profesor por ID y renderizar su vista de detalle
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const profesor = await Profesor.findOneBy({ id });
        if (profesor) {
            res.render('detalleProfesor', { profesor });
        } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener profesor' });
    }
});

// Renderizar el formulario de edición de profesor
router.get('/editar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const profesor = await Profesor.findOneBy({ id });
        if (profesor) {
            res.render('editarProfesor', { profesor });
        } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener profesor' });
    }
});

// Actualizar un profesor  
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { dni, nombre, apellido, email, profesion, telefono } = req.body;
    try {
        const profesor = await Profesor.findOneBy({ id });
        if (profesor) {
            Object.assign(profesor, { dni, nombre, apellido, email, profesion, telefono });
            await profesor.save();
            res.redirect('/profesores'); // Redirigir a la lista de profesores después de actualizar
        } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar profesor' });
    }
});



// Eliminar un profesor
router.get('/eliminar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const profesor = await Profesor.findOneBy({ id });
       if (profesor) {
            await profesor.remove(); // Asegúrate de que este método esté disponible
            res.redirect('/profesores/listar');  // Redirigir a la lista de profesores
      } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar profesor' });
    }
});

// Insertar un nuevo profesor
router.post('/', async (req, res) => {
    await ProfesorController.insertar(req, res);
});

export default router;
