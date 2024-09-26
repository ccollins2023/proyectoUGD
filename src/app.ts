import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "reflect-metadata";
import estudianteRoutes from './routes/estudianteRoutes';
import profesorRoutes from './routes/profesoresRoutes';
import cursoRoutes from './routes/cursoRoutes';
import inscripcionRoutes from './routes/inscripcionRoutes';
import path from 'path';
import methodOverride from 'method-override';






const app = express();
// Middleware para permitir PUT y DELETE en formularios
app.use(methodOverride('_method'));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public'))); // Servir archivos estáticos
console.log(__dirname)
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Rutas
app.get('/', (req: Request, res: Response) => {
    res.render('index'); 
});

app.use('/estudiantes', estudianteRoutes);
app.use('/profesores', profesorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/inscripciones', inscripcionRoutes);

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
