import express from 'express';
import estudiantesController from '../controllers/estudiantesController';


const router = express.Router();

// Crear un nuevo estudiante
router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante'); 
});
router.post('/insertar', estudiantesController.insertar);

// Eliminar un estudiante
router.get('/eliminar/:id', estudiantesController.eliminar);

// Modificar un estudiante
router.put('/modificar', estudiantesController.modificar);

// Obtener un estudiante por ID para editar
router.get('/editar/:id', estudiantesController.editar);

// Obtener todos los estudiantes y renderizar la vista
router.get('/listar', estudiantesController.listar);



export default router;
