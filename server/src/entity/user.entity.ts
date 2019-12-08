import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boss {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    major: String;

}
