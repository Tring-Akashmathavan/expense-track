import { Category } from "../entities/Category";
import { AppDataSource } from "../config/db";

export const categoryResolvers = {
    Query: {
        getAllCategories: async () => {
            return await AppDataSource.getRepository(Category).find();
        },
    },

    Mutation: {
        createCategory: async (_: any, { categoryName }: { categoryName: string }) => {
            const categoryRepository = AppDataSource.getRepository(Category);
            const existingCategory = await categoryRepository.findOne({ where: { categoryName } });

            if (existingCategory) throw new Error("Category already exists");

            const category = categoryRepository.create({ categoryName });
            await categoryRepository.save(category);
            return category;
        },

        updateCategory: async (_: any, { categoryId, categoryName }: any) => {
            const categoryRepository = AppDataSource.getRepository(Category);
            const category = await categoryRepository.findOne({ where: { categoryId } });

            if (!category) throw new Error("Category not found");

            category.categoryName = categoryName;
            await categoryRepository.save(category);
            return category;
        },

        deleteCategory: async (_: any, { categoryId }: any) => {
            const categoryRepository = AppDataSource.getRepository(Category);
            const category = await categoryRepository.findOne({ where: { categoryId } });

            if (!category) throw new Error("Category not found");

            await categoryRepository.remove(category);
            return "Category deleted successfully";
        },
    },
};
