import { User } from "../entities/User";
import { AppDataSource } from "../config/db";
import { hashPassword, comparePasswords, generateToken } from "../utils/auth";

export const userResolvers = {
    Query: {
        getUsers: async () => {
            return await AppDataSource.getRepository(User).find({ relations: ["expenses"] });
        },

        getUser: async (_: any, { id }: { id: number }) => {
            return await AppDataSource.getRepository(User).findOne({ where: { id }, relations: ["expenses"] });
        },
    },

    Mutation: {
        registerUser: async (_: any, { name, email, password }: any) => {
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) throw new Error("User already exists");

            const hashedPassword = await hashPassword(password);
            const user = userRepository.create({ name, email, password: hashedPassword });
            await userRepository.save(user);

            const token = generateToken(user.id);
            return { user, token };
        },

        loginUser: async (_: any, { email, password }: any) => {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });
            if (!user) throw new Error("User not found");

            const isValid = await comparePasswords(password, user.password);
            if (!isValid) throw new Error("Invalid password");

            const token = generateToken(user.id);
            return { user, token };
        },
    },
};
