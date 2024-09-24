import { Router } from 'express';  
import { Profesor } from '../models/profesorModel';  

const router = Router();  

// Crear un nuevo profesor  
router.post('/', async (req, res) => {  
  const { dni, nombre, apellido, email, profesion, telefono } = req.body;  
  try {  
    const nuevoProfesor = Profesor.create({  
      dni,  
      nombre,  
      apellido,  
      email,  
      profesion,  
      telefono,  
    });  
    await nuevoProfesor.save();  
    res.status(201).json(nuevoProfesor);  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Error al crear profesor' });  
  }  
});  

// Obtener un profesor por ID  
router.get('/:id', async (req, res) => {  
  const id = parseInt(req.params.id);  
  try {  
    const profesor = await Profesor.findOneBy({ id });  
    if (profesor) {  
      res.json(profesor);  
    } else {  
      res.status(404).json({ message: 'Profesor no encontrado' });  
    }  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Error al obtener profesor' });  
  }  
}); 



// Obtener todos los profesores  
router.get('/', async (req, res) => {  
  try {  
    const profesores = await Profesor.find();  
    res.json(profesores);  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Error al obtener profesores' });  
  }  
});  

 

// Actualizar un profesor  
router.put('/:id', async (req, res) => {  
  const id = parseInt(req.params.id);  
  const { dni, nombre, apellido, email, profesion, telefono } = req.body;  
  try {  
    const profesor = await Profesor.findOneBy({ id });  
    if (profesor) {  
      profesor.dni = dni;  
      profesor.nombre = nombre;  
      profesor.apellido = apellido;  
      profesor.email = email;  
      profesor.profesion = profesion;  
      profesor.telefono = telefono;  
      await profesor.save();  
      res.json(profesor);  
    } else {  
      res.status(404).json({ message: 'Profesor no encontrado' });  
    }  
  } catch (error) {  
    console.error(error);
  
  }
});
export default router