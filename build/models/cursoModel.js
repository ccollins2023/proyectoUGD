"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const profesorModel_1 = require("./profesorModel");
const estudianteModel_1 = require("./estudianteModel");
let Curso = class Curso extends typeorm_1.BaseEntity {
};
exports.Curso = Curso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Curso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del curso es obligatorio' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' }),
    __metadata("design:type", String)
], Curso.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción del curso es obligatoria' }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profesorModel_1.Profesor, (profesor) => profesor.cursos),
    (0, typeorm_1.JoinColumn)({ name: 'profesor_id' }),
    __metadata("design:type", profesorModel_1.Profesor)
], Curso.prototype, "profesor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => estudianteModel_1.Estudiante, (estudiante) => estudiante.cursos),
    __metadata("design:type", Array)
], Curso.prototype, "estudiantes", void 0);
exports.Curso = Curso = __decorate([
    (0, typeorm_1.Entity)('cursos')
], Curso);
