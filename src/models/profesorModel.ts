import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsEmail, Length, IsNumberString } from "class-validator"; 
import { Curso } from "./cursoModel";

@Entity('profesores')
export class Profesor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()  
    @IsNotEmpty({ message: 'El DNI es obligatorio' })
    @IsNumberString({}, { message: 'El DNI debe ser un número' })
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })  
    dni: string;

    @Column()
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'El apellido es obligatorio.' })
    @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' })
    apellido: string;

    @Column()
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    email: string;

    @Column()
    @IsNotEmpty({ message: 'La profesión es obligatoria' })
    @Length(3, 100, { message: 'La profesión debe tener entre 3 y 100 caracteres' })
    profesion: string;

    @Column()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @IsNumberString({}, { message: 'El teléfono debe contener solo números' })
    @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres' })  
    telefono: string;

    @OneToMany(() => Curso, (curso) => curso.profesor)
    cursos: Curso[];
}
