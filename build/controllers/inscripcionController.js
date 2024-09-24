"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inscripcionModel_1 = require("../models/inscripcionModel");
const cursoModel_1 = require("../models/cursoModel");
const estudianteModel_1 = require("../models/estudianteModel");
class InscripcionesController {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id, estudiante_id, nota } = req.body;
            const errores = {};
            // Validaciones
            if (!curso_id || isNaN(Number(curso_id))) {
                errores.curso_id = 'El ID del curso debe ser un número válido';
            }
            else {
                const curso = yield cursoModel_1.Curso.findOneBy({ id: Number(curso_id) });
                if (!curso) {
                    errores.curso_id = 'Curso no encontrado';
                }
            }
            if (!estudiante_id || isNaN(Number(estudiante_id))) {
                errores.estudiante_id = 'El ID del estudiante debe ser un número válido';
            }
            else {
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(estudiante_id) });
                if (!estudiante) {
                    errores.estudiante_id = 'Estudiante no encontrado';
                }
            }
            if (!nota || isNaN(Number(nota))) {
                errores.nota = 'La nota es obligatoria y debe ser un número válido';
            }
            else if (Number(nota) < 1 || Number(nota) > 10) {
                errores.nota = 'La nota debe estar entre 1 y 10';
            }
            if (Object.keys(errores).length > 0) {
                return res.status(400).json({ errores });
            }
            try {
                const nuevaInscripcion = inscripcionModel_1.Inscripcion.create({
                    curso_id: Number(curso_id),
                    estudiante_id: Number(estudiante_id),
                    nota: Number(nota)
                });
                const inscripcion = yield inscripcionModel_1.Inscripcion.save(nuevaInscripcion);
                res.status(201).json(inscripcion);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscripciones = yield inscripcionModel_1.Inscripcion.find({
                    relations: ['curso', 'estudiante']
                });
                const data = inscripciones.map(inscripcion => ({
                    curso_id: inscripcion.curso_id,
                    estudiante_id: inscripcion.estudiante_id,
                    nota: inscripcion.nota
                }));
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarXEstudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id } = req.params;
            try {
                const inscripciones = yield inscripcionModel_1.Inscripcion.find({
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
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarXCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id } = req.params;
            try {
                const inscripciones = yield inscripcionModel_1.Inscripcion.find({
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
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id, estudiante_id } = req.params;
            const { nuevo_curso_id, nuevo_estudiante_id, nota } = req.body;
            const errores = {};
            // Validaciones
            if (!nuevo_curso_id || isNaN(Number(nuevo_curso_id))) {
                errores.curso_id = 'El ID del curso debe ser un número válido.';
            }
            else {
                const nuevoCurso = yield cursoModel_1.Curso.findOneBy({ id: Number(nuevo_curso_id) });
                if (!nuevoCurso) {
                    errores.curso_id = 'Nuevo curso no encontrado.';
                }
            }
            if (!nuevo_estudiante_id || isNaN(Number(nuevo_estudiante_id))) {
                errores.estudiante_id = 'El ID del estudiante debe ser un número válido.';
            }
            else {
                const nuevoEstudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(nuevo_estudiante_id) });
                if (!nuevoEstudiante) {
                    errores.estudiante_id = 'Nuevo estudiante no encontrado.';
                }
            }
            if (!nota || isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
                errores.nota = 'La nota debe ser un número entre 1 y 10.';
            }
            if (Object.keys(errores).length > 0) {
                const inscripcion = yield inscripcionModel_1.Inscripcion.findOne({ where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) } });
                return res.status(400).json({ errores, inscripcion });
            }
            try {
                yield inscripcionModel_1.Inscripcion.update({ curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) }, {
                    curso_id: Number(nuevo_curso_id),
                    estudiante_id: Number(nuevo_estudiante_id),
                    nota: Number(nota),
                });
                res.status(200).json({ mensaje: 'Inscripción modificada exitosamente' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id, estudiante_id } = req.params;
            try {
                const result = yield inscripcionModel_1.Inscripcion.delete({
                    curso_id: Number(curso_id),
                    estudiante_id: Number(estudiante_id),
                });
                if (result.affected === 0) {
                    return res.status(404).send('Inscripción no encontrada.');
                }
                res.status(200).json({ mensaje: 'Inscripción eliminada exitosamente' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new InscripcionesController();
