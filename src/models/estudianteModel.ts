import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { IsEmail, IsNotEmpty, Length, IsNumberString, Matches } from "class-validator";
import { Curso } from "./cursoModel";

@Entity('estudiantes')
export class Estudiante extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column() 
    @IsNotEmpty({ message: 'El DNI es obligatorio' })
    @IsNumberString({}, { message: 'El DNI debe ser un número' }) 
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' }) 
    dni!: string;

    @Column()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El nombre solo puede contener letras y espacios' })
    nombre!: string;

    @Column()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El apellido solo puede contener letras y espacios' })
    apellido!: string;

    @Column()
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    email!: string;

    @ManyToMany(() => Curso, (curso) => curso.estudiantes)
    cursos: Curso[];
}
