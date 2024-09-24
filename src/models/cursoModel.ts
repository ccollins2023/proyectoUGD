import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, Length, IsString } from "class-validator";
import { Profesor } from "./profesorModel";
import { Estudiante } from "./estudianteModel";

@Entity('cursos')
export class Curso extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: 'El nombre del curso es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    nombre: string;

    @Column('text')
    @IsNotEmpty({ message: 'La descripción del curso es obligatoria' })
    descripcion: string;

    @ManyToOne(() => Profesor, (profesor) => profesor.cursos)
    @JoinColumn({ name: 'profesor_id' })
    profesor: Profesor;

    @ManyToMany(() => Estudiante, (estudiante) => estudiante.cursos)
    estudiantes: Estudiante[];
}
