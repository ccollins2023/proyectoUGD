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
const profesorModel_1 = require("../models/profesorModel");
const router = (0, express_1.Router)();
// Obtener todos los profesores  
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield profesorModel_1.Profesor.find();
        res.json(profesores);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener profesores' });
    }
}));
// Obtener un profesor por ID  
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const profesor = yield profesorModel_1.Profesor.findOneBy({ id });
        if (profesor) {
            res.json(profesor);
        }
        else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener profesor' });
    }
}));
// Crear un nuevo profesor  
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, nombre, apellido, email, profesion, telefono } = req.body;
    try {
        const nuevoProfesor = profesorModel_1.Profesor.create({
            dni,
            nombre,
            apellido,
            email,
            profesion,
            telefono,
        });
        yield nuevoProfesor.save();
        res.status(201).json(nuevoProfesor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear profesor' });
    }
}));
// Actualizar un profesor  
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { dni, nombre, apellido, email, profesion, telefono } = req.body;
    try {
        const profesor = yield profesorModel_1.Profesor.findOneBy({ id });
        if (profesor) {
            profesor.dni = dni;
            profesor.nombre = nombre;
            profesor.apellido = apellido;
            profesor.email = email;
            profesor.profesion = profesion;
            profesor.telefono = telefono;
            yield profesor.save();
            res.json(profesor);
        }
        else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
