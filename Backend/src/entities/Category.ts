import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({ unique: true })
    categoryName: string;
}
