import express from 'express';
import cursosController from '../controllers/cursosController';
import methodOverride from 'method-override';
import { Profesor } from '../models/profesorModel';  // Ajusta la ruta si es necesario

const router = express.Router();
const app = express();
// Middleware para permitir el uso de métodos HTTP como PUT y DELETE
app.use(methodOverride('_method'));
router.use(methodOverride('_method'));

// Mostrar formulario para insertar un nuevo curso
router.get('/insertar', async (req, res) => {
    try {
        // Obtén todos los profesores de la base de datos
        const profesores = await Profesor.find();
        
        // Renderiza la vista y pasa los profesores al EJS
        res.render('insertarCurso', { profesores });
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: 'Error al obtener profesores' });
    }
});

// Crear un nuevo curso
router.post('/insertar', cursosController.insertar);

// Eliminar un curso
router.delete('/eliminar/:id', cursosController.eliminar);


// Listar todos los cursos
router.get('/listar', cursosController.listar);

// Mostrar formulario para editar un curso
router.get('/editar/:id', cursosController.editar);

// Actualizar un curso
router.put('/editar/:id', cursosController.modificar);

export default router;
