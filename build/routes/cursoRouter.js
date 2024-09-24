"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursosController_1 = __importDefault(require("../controllers/cursosController"));
const method_override_1 = __importDefault(require("method-override"));
const router = express_1.default.Router();
// Middleware para permitir el uso de métodos HTTP como PUT y DELETE
router.use((0, method_override_1.default)('_method'));
// Listar todos los cursos
router.get('/listar', cursosController_1.default.listar);
// Mostrar formulario para insertar un nuevo curso
router.get('/insertar', (req, res) => {
    res.render('insertarCurso');
});
// Crear un nuevo curso
router.post('/insertar', cursosController_1.default.insertar);
// Mostrar formulario para editar un curso
router.get('/editar/:id', cursosController_1.default.editar);
// Actualizar un curso
router.put('/editar/:id', cursosController_1.default.modificar);
// Eliminar un curso
router.get('/eliminar/:id', cursosController_1.default.eliminar);
exports.default = router;
