import { createConnection } from 'mysql2/promise';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Estudiante } from '../models/estudianteModel';
import { Profesor } from '../models/profesorModel';
import { Curso } from '../models/cursoModel';
import { Inscripcion } from '../models/inscripcionModel';

dotenv.config();

const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

async function createDatabaseIfNotExists() {
    try {
        const connection = await createConnection({
            host: process.env.DB_HOST,
            port,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos "${process.env.DB_NAME}" creada o ya existente.`);
        await connection.end();
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
        throw error;
    }
}

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Estudiante, Profesor, Curso, Inscripcion],
    synchronize: false,
    logging: true,
});

export async function initializeDatabase() {
    try {
        await createDatabaseIfNotExists();
        await AppDataSource.initialize();
        console.log('Conexión establecida con la base de datos y tablas sincronizadas.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
}
    