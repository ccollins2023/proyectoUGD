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
const estudianteModel_1 = require("../models/estudianteModel");
class EstudiantesController {
    constructor() { }
    consultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield estudianteModel_1.Estudiante.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Estudiante no encontrado');
                }
                res.status(200).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, nombre, apellido, email } = req.body;
            const errores = {};
            // Validaciones
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
            }
            else {
                const estudianteExistente = yield estudianteModel_1.Estudiante.findOneBy({ dni });
                if (estudianteExistente) {
                    errores.dni = 'El DNI ya está registrado para otro estudiante.';
                }
            }
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio.';
            }
            else {
                if (nombre.length < 3) {
                    errores.nombre = 'El nombre debe tener al menos 3 letras.';
                }
                if (!/^[A-Za-z]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras.';
                }
            }
            if (!apellido) {
                errores.apellido = 'El apellido es obligatorio.';
            }
            else {
                if (apellido.length < 3) {
                    errores.apellido = 'El apellido debe tener al menos 3 letras.';
                }
                if (!/^[A-Za-z]+$/.test(apellido)) {
                    errores.apellido = 'El apellido solo puede contener letras.';
                }
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                errores.email = 'Debe ser un correo electrónico válido.';
            }
            if (Object.keys(errores).length > 0) {
                return res.render('insertarEstudiante', { errores, dni, nombre, apellido, email });
            }
            try {
                const estudiante = estudianteModel_1.Estudiante.create({ dni, nombre, apellido, email });
                yield estudianteModel_1.Estudiante.save(estudiante);
                res.redirect('/estudiantes/listar');
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
            const { id, dni, nombre, apellido, email } = req.body;
            const errores = {};
            // Validar DNI
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
            }
            else {
                const estudianteExistente = yield estudianteModel_1.Estudiante.findOneBy({ dni });
                if (estudianteExistente && estudianteExistente.id !== Number(id)) {
                    errores.dni = 'El DNI ya está registrado para otro estudiante.';
                }
            }
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio.';
            }
            else {
                if (nombre.length < 3) {
                    errores.nombre = 'El nombre debe tener al menos 3 letras.';
                }
                if (!/^[A-Za-z]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras.';
                }
            }
            if (!apellido) {
                errores.apellido = 'El apellido es obligatorio.';
            }
            else {
                if (apellido.length < 3) {
                    errores.apellido = 'El apellido debe tener al menos 3 letras.';
                }
                if (!/^[A-Za-z]+$/.test(apellido)) {
                    errores.apellido = 'El apellido solo puede contener letras.';
                }
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                errores.email = 'Debe ser un correo electrónico válido.';
            }
            if (Object.keys(errores).length > 0) {
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(id) });
                return res.render('editarEstudiante', { errores, estudiante });
            }
            try {
                yield estudianteModel_1.Estudiante.update(id, { dni, nombre, apellido, email });
                res.redirect('/estudiantes/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantes = yield estudianteModel_1.Estudiante.find();
                res.render('listarEstudiantes', { estudiantes });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(id) });
                if (!estudiante) {
                    return res.status(404).send('Estudiante no encontrado');
                }
                res.render('editarEstudiante', { estudiante });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Estudiante no encontrado');
                }
                yield estudianteModel_1.Estudiante.delete({ id: Number(id) });
                res.redirect('/estudiantes/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new EstudiantesController();
