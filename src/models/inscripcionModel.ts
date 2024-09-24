import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn } from "typeorm";
import { Curso } from "./cursoModel";
import { Estudiante } from "./estudianteModel";
import { IsNumber, Min, Max, IsNotEmpty } from "class-validator"; 

@Entity('cursos_estudiantes')
export class Inscripcion extends BaseEntity {
    @PrimaryColumn()  
    curso_id: number;

    @PrimaryColumn()  
    estudiante_id: number;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: 'curso_id' })  
    curso: Curso;

    @ManyToOne(() => Estudiante)
    @JoinColumn({ name: 'estudiante_id' })  
    estudiante: Estudiante;

    @Column('float')
    @IsNotEmpty({ message: 'La nota es obligatoria' })
    @IsNumber({}, { message: 'La nota debe ser un número válido' })
    @Min(1, { message: 'La nota mínima es 1' })
    @Max(10, { message: 'La nota máxima es 10' })  
    nota: number;
}
