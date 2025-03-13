import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Expense } from "./Expense";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses: Expense[];
}
