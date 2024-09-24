"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantesController_1 = __importDefault(require("../controllers/estudiantesController"));
const router = express_1.default.Router();
// Obtener todos los estudiantes y renderizar la vista
router.get('/listar', estudiantesController_1.default.listar);
// Renderizar vista para insertar un nuevo estudiante
router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante');
});
// Crear un nuevo estudiante
router.post('/insertar', estudiantesController_1.default.insertar);
// Obtener un estudiante por ID para editar
router.get('/editar/:id', estudiantesController_1.default.editar);
// Modificar un estudiante
router.put('/modificar/:id', estudiantesController_1.default.modificar);
// Eliminar un estudiante
router.get('/eliminar/:id', estudiantesController_1.default.eliminar);
exports.default = router;
