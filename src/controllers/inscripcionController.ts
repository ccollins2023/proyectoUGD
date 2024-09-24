import { Request, Response } from "express";
import { Inscripcion } from "../models/inscripcionModel";
import { Curso } from "../models/cursoModel";
import { Estudiante } from "../models/estudianteModel";

class InscripcionesController {

    async insertar(req: Request, res: Response) {
        const { curso_id, estudiante_id, nota } = req.body;
        const errores: { curso_id?: string; estudiante_id?: string; nota?: string } = {};

        // Validaciones
        if (!curso_id || isNaN(Number(curso_id))) {
            errores.curso_id = 'El ID del curso debe ser un número válido';
        } else {
            const curso = await Curso.findOneBy({ id: Number(curso_id) });
            if (!curso) {
                errores.curso_id = 'Curso no encontrado';
            }
        }

        if (!estudiante_id || isNaN(Number(estudiante_id))) {
            errores.estudiante_id = 'El ID del estudiante debe ser un número válido';
        } else {
            const estudiante = await Estudiante.findOneBy({ id: Number(estudiante_id) });
            if (!estudiante) {
                errores.estudiante_id = 'Estudiante no encontrado';
            }
        }

        if (!nota || isNaN(Number(nota))) {
            errores.nota = 'La nota es obligatoria y debe ser un número válido';
        } else if (Number(nota) < 1 || Number(nota) > 10) {
            errores.nota = 'La nota debe estar entre 1 y 10';
        }

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ errores });
        }

        try {
            const nuevaInscripcion = Inscripcion.create({
                curso_id: Number(curso_id),
                estudiante_id: Number(estudiante_id),
                nota: Number(nota)
            });

            const inscripcion = await Inscripcion.save(nuevaInscripcion);
            res.status(201).json(inscripcion);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarTodos(req: Request, res: Response) {
        try {
            const inscripciones = await Inscripcion.find({
                relations: ['curso', 'estudiante']
            });

            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));

            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarXEstudiante(req: Request, res: Response) {
        const { estudiante_id } = req.params;
        try {
            const inscripciones = await Inscripcion.find({
                where: { estudiante_id: Number(estudiante_id) },
                relations: ['curso', 'estudiante']
            });

            if (!inscripciones.length) {
                return res.status(404).json({ mensaje: 'No se encontraron inscripciones para este estudiante' });
            }

            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));

            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarXCurso(req: Request, res: Response) {
        const { curso_id } = req.params;
        try {
            const inscripciones = await Inscripcion.find({
                where: { curso_id: Number(curso_id) },
                relations: ['curso', 'estudiante']
            });

            if (!inscripciones.length) {
                return res.status(404).json({ mensaje: 'No se encontraron inscripciones para este curso' });
            }

            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));

            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async modificar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;
        const { nuevo_curso_id, nuevo_estudiante_id, nota } = req.body;
        const errores: { curso_id?: string; estudiante_id?: string; nota?: string } = {};

        // Validaciones
        if (!nuevo_curso_id || isNaN(Number(nuevo_curso_id))) {
            errores.curso_id = 'El ID del curso debe ser un número válido.';
        } else {
            const nuevoCurso = await Curso.findOneBy({ id: Number(nuevo_curso_id) });
            if (!nuevoCurso) {
                errores.curso_id = 'Nuevo curso no encontrado.';
            }
        }

        if (!nuevo_estudiante_id || isNaN(Number(nuevo_estudiante_id))) {
            errores.estudiante_id = 'El ID del estudiante debe ser un número válido.';
        } else {
            const nuevoEstudiante = await Estudiante.findOneBy({ id: Number(nuevo_estudiante_id) });
            if (!nuevoEstudiante) {
                errores.estudiante_id = 'Nuevo estudiante no encontrado.';
            }
        }

        if (!nota || isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
            errores.nota = 'La nota debe ser un número entre 1 y 10.';
        }

        if (Object.keys(errores).length > 0) {
            const inscripcion = await Inscripcion.findOne({ where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) } });
            return res.status(400).json({ errores, inscripcion });
        }

        try {
            await Inscripcion.update({ curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) }, {
                curso_id: Number(nuevo_curso_id),
                estudiante_id: Number(nuevo_estudiante_id),
                nota: Number(nota),
            });
            res.status(200).json({ mensaje: 'Inscripción modificada exitosamente' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async borrar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;

        try {
            const result = await Inscripcion.delete({
                curso_id: Number(curso_id),
                estudiante_id: Number(estudiante_id),
            });
            if (result.affected === 0) {
                return res.status(404).send('Inscripción no encontrada.');
            }
            res.status(200).json({ mensaje: 'Inscripción eliminada exitosamente' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new InscripcionesController();
