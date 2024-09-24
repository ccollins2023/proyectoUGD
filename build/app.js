"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata");
const estudianteRouter_1 = __importDefault(require("./routes/estudianteRouter"));
const profesoresRouter_1 = __importDefault(require("./routes/profesoresRouter"));
const cursoRouter_1 = __importDefault(require("./routes/cursoRouter"));
const inscripcionRouter_1 = __importDefault(require("./routes/inscripcionRouter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // Servir archivos estáticos
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Rutas
app.get('/', (req, res) => {
    res.render('index'); // Cambia 'index' por el nombre de tu vista principal
});
app.use('/estudiantes', estudianteRouter_1.default);
app.use('/profesores', profesoresRouter_1.default);
app.use('/cursos', cursoRouter_1.default);
app.use('/inscripciones', inscripcionRouter_1.default);
// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});
// Middleware para manejar errores (se agrega al final)
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Ocurrió un error interno en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
exports.default = app;
