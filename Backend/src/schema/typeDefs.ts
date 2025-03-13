export const typeDefs = `

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        expenses: [Expense!]!
    }

    type Expense {
        expenseId: ID!
        userId: ID!
        title: String!
        cost: Float!
        date: String!
        createdAt: String!
        updatedAt: String
        categories: [Category]!
    }

    type Category {
        categoryId: ID
        categoryName: String!
    }

    type AuthPayload {
        user: User!
        token: String!
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): User

        getUserExpenses(userId: ID!): [Expense!]!
        getExpensesByDay(userId: ID!, day: String!): [Expense!]!
        getExpensesByMonth(userId: ID!, month: String!): [Expense!]!
        getExpensesByYear(userId: ID!, year: String!): [Expense!]!

        getAllCategories: [Category!]!
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): AuthPayload!
        loginUser(email: String!, password: String!): AuthPayload!

        createExpense(userId: ID!, title: String!, cost: Float!, date: String!, categoryIds: [ID!]!): Expense!
        updateExpense(expenseId: ID!, title: String, cost: Float, date: String, categoryIds: [ID!]): Expense!
        deleteExpense(expenseId: ID!): String!

        createCategory(categoryName: String!): [Category]!
        updateCategory(categoryId: ID!, categoryName: String!): [Category]!
        deleteCategory(categoryId: ID!): String!
    }
`;
