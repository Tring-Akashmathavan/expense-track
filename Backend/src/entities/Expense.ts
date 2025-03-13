import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    expenseId: number;

    @Column()
    title: string;

    @Column("float")
    cost: number;

    @Column()
    date: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;

    @Column({ nullable: true })
    updatedAt: string;

    @ManyToOne(() => User, (user) => user.expenses, { onDelete: "CASCADE" })
    user: User;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
