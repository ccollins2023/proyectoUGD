import express from 'express';
import estudiantesController from '../controllers/estudiantesController';
import methodOverride from 'method-override';

const router = express.Router();
router.use(methodOverride('_method'))
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



export default router;
