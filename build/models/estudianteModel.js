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
exports.Estudiante = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const cursoModel_1 = require("./cursoModel");
let Estudiante = class Estudiante extends typeorm_1.BaseEntity {
};
exports.Estudiante = Estudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Estudiante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El DNI es obligatorio' }),
    (0, class_validator_1.IsNumberString)({}, { message: 'El DNI debe ser un número' }),
    (0, class_validator_1.Length)(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' }),
    __metadata("design:type", String)
], Estudiante.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    (0, class_validator_1.Length)(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' }),
    (0, class_validator_1.Matches)(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El nombre solo puede contener letras y espacios' }),
    __metadata("design:type", String)
], Estudiante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es obligatorio' }),
    (0, class_validator_1.Length)(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' }),
    (0, class_validator_1.Matches)(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El apellido solo puede contener letras y espacios' }),
    __metadata("design:type", String)
], Estudiante.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe ser un correo electrónico válido' }),
    __metadata("design:type", String)
], Estudiante.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => cursoModel_1.Curso, (curso) => curso.estudiantes),
    __metadata("design:type", Array)
], Estudiante.prototype, "cursos", void 0);
exports.Estudiante = Estudiante = __decorate([
    (0, typeorm_1.Entity)('estudiantes')
], Estudiante);
