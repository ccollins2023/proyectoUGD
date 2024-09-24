import express from 'express';
import cursosController from '../controllers/cursosController';
import methodOverride from 'method-override';

const router = express.Router();

// Middleware para permitir el uso de métodos HTTP como PUT y DELETE
router.use(methodOverride('_method'));

// Crear un nuevo curso
router.post('/insertar', cursosController.insertar);

// Eliminar un curso
router.get('/eliminar/:id', cursosController.eliminar);

// Listar todos los cursos
router.get('/listar', cursosController.listar);

// Mostrar formulario para insertar un nuevo curso
router.get('/insertar', (req, res) => {
    res.render('insertarCurso');
});


// Mostrar formulario para editar un curso
router.get('/editar/:id', cursosController.editar);

// Actualizar un curso
router.put('/editar/:id', cursosController.modificar);



export default router;
