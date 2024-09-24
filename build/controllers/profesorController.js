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
const profesorModel_1 = require("../models/profesorModel");
class ProfesorController {
    constructor() { }
    consultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield profesorModel_1.Profesor.find();
                res.status(200).json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al consultar los profesores");
            }
        });
    }
    consultarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield profesorModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!registro) {
                    return res.status(404).send("Profesor no encontrado");
                }
                res.status(200).json(registro);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al consultar el profesor");
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, nombre, apellido, email, profesion, telefono } = req.body;
            const errores = {};
            // Validaciones
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = "El DNI debe contener exactamente 8 dígitos numéricos.";
            }
            else {
                const profesorExistente = yield profesorModel_1.Profesor.findOne({ where: { dni } });
                if (profesorExistente) {
                    errores.dni = "Ya existe un profesor con este DNI.";
                }
            }
            if (!nombre || nombre.length < 3 || !/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = "El nombre es obligatorio y debe tener al menos 3 letras.";
            }
            if (!apellido || apellido.length < 3 || !/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = "El apellido es obligatorio y debe tener al menos 3 letras.";
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                errores.email = "Debe ser un correo electrónico válido.";
            }
            if (!profesion || profesion.length < 3 || profesion.length > 100) {
                errores.profesion = "La profesión debe tener entre 3 y 100 caracteres.";
            }
            if (!telefono || !/^\d{7,15}$/.test(telefono)) {
                errores.telefono = "El teléfono debe contener entre 7 y 15 dígitos numéricos.";
            }
            if (Object.keys(errores).length > 0) {
                return res.status(400).json({ errores });
            }
            try {
                const profesor = profesorModel_1.Profesor.create({ dni, nombre, apellido, email, profesion, telefono });
                yield profesorModel_1.Profesor.save(profesor);
                res.status(201).json(profesor);
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al insertar el profesor");
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { dni, nombre, apellido, email, profesion, telefono } = req.body;
            const errores = {};
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = "El DNI debe contener exactamente 8 dígitos numéricos.";
            }
            else {
                const profesorExistente = yield profesorModel_1.Profesor.findOne({ where: { dni } });
                if (profesorExistente && profesorExistente.id !== Number(id)) {
                    errores.dni = "Ya existe otro profesor con este DNI.";
                }
            }
            if (!nombre || nombre.length < 3 || !/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = "El nombre es obligatorio y debe tener al menos 3 letras.";
            }
            if (!apellido || apellido.length < 3 || !/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = "El apellido es obligatorio y debe tener al menos 3 letras.";
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                errores.email = "Debe ser un correo electrónico válido.";
            }
            if (!profesion || profesion.length < 3 || profesion.length > 100) {
                errores.profesion = "La profesión debe tener entre 3 y 100 caracteres.";
            }
            if (!telefono || !/^\d{7,15}$/.test(telefono)) {
                errores.telefono = "El teléfono debe contener entre 7 y 15 dígitos numéricos.";
            }
            if (Object.keys(errores).length > 0) {
                return res.status(400).json({ errores });
            }
            try {
                yield profesorModel_1.Profesor.update(id, { dni, nombre, apellido, email, profesion, telefono });
                res.status(200).json({ mensaje: "Profesor actualizado exitosamente" });
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al modificar el profesor");
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield profesorModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!registro) {
                    return res.status(404).send("Profesor no encontrado");
                }
                yield profesorModel_1.Profesor.delete({ id: Number(id) });
                res.status(200).json({ mensaje: "Profesor eliminado exitosamente" });
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al eliminar el profesor");
            }
        });
    }
}
exports.default = new ProfesorController();
