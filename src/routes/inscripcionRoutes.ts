import { Router } from 'express';  
import { Inscripcion } from '../models/inscripcionModel';  

const router = Router();  

// Crear una nueva inscripción  
router.post('/', async (req, res) => {  
  const { curso, estudianteId, nota } = req.body;  
  try {  
    const nuevaInscripcion = await Inscripcion.create(req.body);  
    await Inscripcion.save(nuevaInscripcion);  
    res.status(201).json(nuevaInscripcion);  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Error al crear inscripción' });  
  }  
});  

// Obtener todas las inscripciones y renderizar la vista
router.get('/', async (req, res) => {  
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

// Actualizar una inscripción  
router.put('/:cursoId/:estudianteId', async (req, res) => {  
  const cursoId = parseInt(req.params.cursoId);  
  const estudianteId = parseInt(req.params.estudianteId);  
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
router.get('/:cursoId/:estudianteId', async (req, res) => {  
  const cursoId = parseInt(req.params.cursoId);  
  const estudianteId = parseInt(req.params.estudianteId);  
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
router.delete('/:cursoId/:estudianteId', async (req, res) => {  
  const cursoId = parseInt(req.params.cursoId);  
  const estudianteId = parseInt(req.params.estudianteId);  
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
