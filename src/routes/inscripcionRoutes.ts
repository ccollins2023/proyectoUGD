import { Router } from 'express';
import InscripcionesController from '../controllers/inscripcionController';

const router = Router();

// Rutas para inscripciones
router.post('/', InscripcionesController.insertar); // Insertar inscripción
router.get('/', InscripcionesController.consultarTodos); // Consultar todas las inscripciones
router.get('/listar', InscripcionesController.consultarTodos); // Listar todas las inscripciones y renderizar
router.get('/estudiante/:estudiante_id', InscripcionesController.consultarXEstudiante); // Consultar inscripciones por estudiante
router.get('/curso/:curso_id', InscripcionesController.consultarXCurso); // Consultar inscripciones por curso
router.get('/:curso_id/:estudiante_id/editar', InscripcionesController.modificar); // Obtener datos para editar inscripción
router.put('/:curso_id/:estudiante_id', InscripcionesController.modificar); // Modificar inscripción
router.delete('/:curso_id/:estudiante_id', InscripcionesController.borrar); // Borrar inscripción

export default router;
