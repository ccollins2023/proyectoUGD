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
const express_1 = require("express");
const inscripcionModel_1 = require("../models/inscripcionModel");
const router = (0, express_1.Router)();
// Obtener todas las inscripciones  
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inscripciones = yield inscripcionModel_1.Inscripcion.find({
            relations: {
                curso: true,
                estudiante: true,
            },
        });
        res.json(inscripciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inscripciones' });
    }
}));
// Obtener una inscripción por ID de curso y estudiante  
router.get('/:cursoId/:estudianteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursoId = parseInt(req.params.cursoId);
    const estudianteId = parseInt(req.params.estudianteId);
    try {
        const inscripcion = yield inscripcionModel_1.Inscripcion.findOne({
            where: { curso_id: cursoId, estudiante_id: estudianteId },
            relations: {
                curso: true,
                estudiante: true,
            },
        });
        if (inscripcion) {
            res.json(inscripcion);
        }
        else {
            res.status(404).json({ message: 'Inscripcion no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener inscripción' });
    }
}));
// Crear una nueva inscripción  
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { curso, estudianteId, nota } = req.body;
    try {
        const nuevaInscripcion = inscripcionModel_1.Inscripcion.create(req.body);
        yield inscripcionModel_1.Inscripcion.save(nuevaInscripcion);
        res.status(201).json(nuevaInscripcion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear inscripción' });
    }
}));
// Actualizar una inscripción  
router.put('/:cursoId/:estudianteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursoId = parseInt(req.params.cursoId);
    const estudianteId = parseInt(req.params.estudianteId);
    const { nota } = req.body;
    try {
        const inscripcion = yield inscripcionModel_1.Inscripcion.findOne({
            where: { curso_id: cursoId, estudiante_id: estudianteId },
        });
        if (inscripcion) {
            inscripcion.nota = nota;
            yield inscripcion.save();
            res.json(inscripcion);
        }
        else {
            res.status(404).json({ message: 'Inscripcion no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar inscripción' });
    }
}));
// Eliminar una inscripción  
router.delete('/:cursoId/:estudianteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursoId = parseInt(req.params.cursoId);
    const estudianteId = parseInt(req.params.estudianteId);
    try {
        const inscripcion = yield inscripcionModel_1.Inscripcion.findOne({
            where: { curso_id: cursoId, estudiante_id: estudianteId },
        });
        if (inscripcion) {
            yield inscripcion.remove();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Inscripcion no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar inscripción' });
    }
}));
exports.default = router;
