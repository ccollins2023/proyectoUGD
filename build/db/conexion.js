"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AppDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
const promise_1 = require("mysql2/promise");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const estudianteModel_1 = require("../models/estudianteModel");
const profesorModel_1 = require("../models/profesorModel");
const cursoModel_1 = require("../models/cursoModel");
const inscripcionModel_1 = require("../models/inscripcionModel");
dotenv.config();
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
function createDatabaseIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, promise_1.createConnection)({
                host: process.env.DB_HOST,
                port,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            });
            yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
            console.log(`Base de datos "${process.env.DB_NAME}" creada o ya existente.`);
            yield connection.end();
        }
        catch (error) {
            console.error('Error al crear la base de datos:', error);
            throw error;
        }
    });
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [estudianteModel_1.Estudiante, profesorModel_1.Profesor, cursoModel_1.Curso, inscripcionModel_1.Inscripcion],
    synchronize: false,
    logging: true,
});
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createDatabaseIfNotExists();
            yield exports.AppDataSource.initialize();
            console.log('Conexión establecida con la base de datos y tablas sincronizadas.');
        }
        catch (error) {
            console.error('Error al inicializar la base de datos:', error);
            throw error;
        }
    });
}
