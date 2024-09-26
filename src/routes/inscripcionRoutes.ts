import { Router } from 'express';  
import { Inscripcion } from '../models/inscripcionModel';  

const router = Router();  

// Crear una nueva inscripción  
router.post('/', async (req, res) => {  
    const { curso_id, estudiante_id, nota } = req.body; // Ajustar nombres de variables a los de Inscripcion
    try {  
        const nuevaInscripcion = new Inscripcion(); // Crear una nueva instancia de Inscripcion
        nuevaInscripcion.curso_id = curso_id;
        nuevaInscripcion.estudiante_id = estudiante_id;
        nuevaInscripcion.nota = nota;

        await nuevaInscripcion.save();  
        res.status(201).json(nuevaInscripcion);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Error al crear inscripción' });  
    }  
});  

// Obtener todas las inscripciones y renderizar la vista
router.get('/listar', async (req, res) => {  
    try {  
        const inscripciones = await Inscripcion.find({  
            relations: {  
                curso: true,  
                estudiante: true,  
            },  
        });  
        res.render('listarInscripciones', { inscripciones }); // Renderiza la vista listarInscripciones.ejs
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Error al obtener inscripciones' });  
    }  
});  

// Ruta para mostrar el formulario de edición
router.get('/editar/:curso_id/:estudiante_id', async (req, res) => {  // Cambié a curso_id y estudiante_id
    const cursoId = parseInt(req.params.curso_id); // Cambié a curso_id
    const estudianteId = parseInt(req.params.estudiante_id); // Cambié a estudiante_id
    try {
        const inscripcion = await Inscripcion.findOne({
            where: { curso_id: cursoId, estudiante_id: estudianteId },
            relations: { curso: true, estudiante: true },
        });
        if (inscripcion) {
            res.render('editarInscripcion', { inscripcion }); // Renderiza la vista editarInscripcion.ejs
        } else {
            res.status(404).json({ message: 'Inscripción no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inscripción para editar' });
    }
});

// Actualizar una inscripción  
router.put('/:curso_id/:estudiante_id', async (req, res) => {  // Cambié a curso_id y estudiante_id
    const cursoId = parseInt(req.params.curso_id); // Cambié a curso_id
    const estudianteId = parseInt(req.params.estudiante_id); // Cambié a estudiante_id
    const { nota } = req.body;  
    try {  
        const inscripcion = await Inscripcion.findOne({  
            where: { curso_id: cursoId, estudiante_id: estudianteId },  
        });  
        if (inscripcion) {  
            inscripcion.nota = nota;  
            await inscripcion.save();  
            res.json(inscripcion);  
        } else {  
            res.status(404).json({ message: 'Inscripción no encontrada' });  
        }  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Error al actualizar inscripción' });  
    }  
});  

// Obtener una inscripción por ID de curso y estudiante  
router.get('/:curso_id/:estudiante_id', async (req, res) => {  // Cambié a curso_id y estudiante_id
    const cursoId = parseInt(req.params.curso_id); // Cambié a curso_id
    const estudianteId = parseInt(req.params.estudiante_id); // Cambié a estudiante_id
    try {  
        const inscripcion = await Inscripcion.findOne({  
            where: { curso_id: cursoId, estudiante_id: estudianteId },  
            relations: {  
                curso: true,  
                estudiante: true,  
            },  
        });  
        if (inscripcion) {  
            res.json(inscripcion);  
        } else {  
            res.status(404).json({ message: 'Inscripción no encontrada' });  
        }  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Error al obtener inscripción' });  
    }  
});  

// Eliminar una inscripción  
router.delete('/:curso_id/:estudiante_id', async (req, res) => {  // Cambié a curso_id y estudiante_id
    const cursoId = parseInt(req.params.curso_id); // Cambié a curso_id
    const estudianteId = parseInt(req.params.estudiante_id); // Cambié a estudiante_id
    try {  
        const inscripcion = await Inscripcion.findOne({  
            where: { curso_id: cursoId, estudiante_id: estudianteId },  
        });  
        if (inscripcion) {  
            await inscripcion.remove();  
            res.status(204).send();  
        } else {  
            res.status(404).json({ message: 'Inscripción no encontrada' });  
        }  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Error al eliminar inscripción' });  
    }  
});  

export default router;
