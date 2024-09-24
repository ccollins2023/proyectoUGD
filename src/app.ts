import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "reflect-metadata";
import estudianteRouter from './routes/estudianteRouter';
import profesorRouter from './routes/profesoresRouter';
import cursoRouter from './routes/cursoRouter';
import inscripcionRouter from './routes/inscripcionRouter';
import path from 'path';

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Rutas
app.get('/', (req: Request, res: Response) => {
    res.render('index'); // Cambia 'index' por el nombre de tu vista principal
});

app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/cursos', cursoRouter);
app.use('/inscripciones', inscripcionRouter);

// Middleware para manejar rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});

// Middleware para manejar errores (se agrega al final)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Ocurrió un error interno en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
