import express from 'express';
import estudiantesController from '../controllers/estudiantesController';

const router = express.Router();



// Crear un nuevo estudiante
router.post('/insertar', estudiantesController.insertar);

// Eliminar un estudiante
router.delete('/eliminar/:id', estudiantesController.eliminar);


// Modificar un estudiante
router.put('/modificar/:id', estudiantesController.modificar);

// Obtener un estudiante por ID para editar
router.get('/editar/:id', estudiantesController.editar);


// Obtener todos los estudiantes y renderizar la vista
router.get('/listar', estudiantesController.listar);

// Renderizar vista para insertar un nuevo estudiante
router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante'); 
});

export default router;
