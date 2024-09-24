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
const cursoModel_1 = require("../models/cursoModel");
const cursosController = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cursos = yield cursoModel_1.Curso.find();
            res.render('listarCursos', { cursos });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener cursos' });
        }
    }),
    insertar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nombre, descripcion, profesor } = req.body;
        try {
            const nuevoCurso = cursoModel_1.Curso.create({ nombre, descripcion, profesor });
            yield nuevoCurso.save();
            res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear curso' });
        }
    }),
    editar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const curso = yield cursoModel_1.Curso.findOneBy({ id });
            if (curso) {
                res.render('editarCurso', { curso });
            }
            else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener curso' });
        }
    }),
    modificar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, profesor } = req.body;
        try {
            const curso = yield cursoModel_1.Curso.findOneBy({ id });
            if (curso) {
                curso.nombre = nombre;
                curso.descripcion = descripcion;
                curso.profesor = profesor;
                yield curso.save();
                res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
            }
            else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar curso' });
        }
    }),
    eliminar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const curso = yield cursoModel_1.Curso.findOneBy({ id });
            if (curso) {
                yield curso.remove();
                res.redirect('/cursos/listar'); // Redirigir a la lista de cursos
            }
            else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar curso' });
        }
    })
};
exports.default = cursosController;
