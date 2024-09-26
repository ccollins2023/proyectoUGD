import { Router } from 'express';
import { Profesor } from '../models/profesorModel';
import profesorController from '../controllers/profesorController';

const router = Router();
router.get('/insertar', (req, res) => {
    res.render('insertarProfesor');
});


router.post('/insertar', profesorController.insertar);


router.get('/listar', profesorController.listar);


router.get('/editar/:id', profesorController.editar);


router.put('/modificar', profesorController.modificar);


router.get('/eliminar/:id', profesorController.borrar);
/*
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
router.get('/insertar', (req, res) => {
    res.render('insertarProfesor'); 
});

// Insertar un nuevo profesor
router.post('/insertar', profesorController.insertar);*/

export default router;
