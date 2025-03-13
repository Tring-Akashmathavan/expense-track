import { Expense } from "../entities/Expense";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { AppDataSource } from "../config/db";

export const expenseResolvers = {

    Query: {
        getUserExpenses: async (_: any, { userId }: { userId: number }) => {
            return await AppDataSource.getRepository(Expense).find({
                where: { user: { id: userId } },
                relations: ["categories"],
            });
        },

        getExpensesByDay: async (_: any, { userId, day }: { userId: number; day: string }) => {
            const expenses = await AppDataSource.getRepository(Expense).find({
                where: { user: { id: userId }, date: day },
                relations: ["categories"],
            });

            const total = expenses.reduce((sum , expense) => sum + expense.cost , 0);
            return{
                day,
                total,
                expenses
            }
        },

        getExpensesByMonth: async (_: any, { userId, month }: { userId: number; month: string }) => {
            const expenses = await AppDataSource.getRepository(Expense)
                .createQueryBuilder("expense")
                .where("expense.userId = :userId", { userId })
                .andWhere("TO_CHAR(expense.date, 'YYYY-MM') = :month", { month })
                .leftJoinAndSelect("expense.categories", "category")
                .getMany();


                const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);

                return {
                    month,
                    total,
                    expenses,
                }
        },

        getExpensesByYear: async (_: any, { userId, year }: { userId: number; year: string }) => {
            const expenses = await AppDataSource.getRepository(Expense)
                .createQueryBuilder("expense")
                .where("expense.userId = :userId", { userId })
                .andWhere("TO_CHAR(expense.date, 'YYYY') = :year", { year })
                .leftJoinAndSelect("expense.categories", "category")
                .getMany();

                const total = expenses.reduce((sum , expense) => sum + expense.cost , 0);

                return {
                    year,
                    total,
                    expenses
                }
        },
    },

    Mutation: {
        createExpense: async (_: any, { userId, title, cost, date, categoryIds }: any) => {
                console.log("Received Variables:", { userId, title, cost, date, categoryIds });

                const expenseRepository = AppDataSource.getRepository(Expense);
                const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

                if (!user) throw new Error("User not found");

                const categories = await AppDataSource.getRepository(Category).findByIds(categoryIds);
                // if (categories.length !== categoryIds.length) throw new Error("Invalid category IDs");

                const expense = expenseRepository.create({ title, cost, date, user, categories });
                await expenseRepository.save(expense);
                return expense;
        },

        updateExpense: async (_: any, { expenseId, title, cost, date, categoryIds }: any) => {
            const expenseRepository = AppDataSource.getRepository(Expense);
            const expense = await expenseRepository.findOne({ where: { expenseId }, relations: ["categories"] });

            if (!expense) throw new Error("Expense not found");

            if (categoryIds) {
                const categories = await AppDataSource.getRepository(Category).findByIds(categoryIds);
                expense.categories = categories;
            }

            if (title) expense.title = title;
            if (cost) expense.cost = cost;
            if (date) expense.date = date;
            expense.updatedAt = new Date().toISOString();

            await expenseRepository.save(expense);
            return expense;
        },

        deleteExpense: async (_: any, { expenseId }: { expenseId: number }) => {
            const expenseRepository = AppDataSource.getRepository(Expense);
            const expense = await expenseRepository.findOne({ where: { expenseId } });

            if (!expense) throw new Error("Expense not found");

            await expenseRepository.remove(expense);
            return "Expense deleted successfully";
        },
    },
};
