import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import ExpenseTable from "../Expense/ExpenseTable";
import AddExpense from "../Expense/AddExpense";
import { useOutletContext } from "react-router-dom";

// GraphQL Queries
const GET_USER_EXPENSES = gql`
  query GetUserExpenses($userId: ID!) {
    getUserExpenses(userId: $userId) {
      expenseId
      title
      cost
      date
      categories {
        categoryId
        categoryName
      }
    }
  }
`;
// GraphQL Mutations
const CREATE_EXPENSE = gql`
  mutation CreateExpense(
    $userId: ID!
    $title: String!
    $cost: Float!
    $date: String!
    $categoryIds: [ID!]!
  ) {
    createExpense(
      userId: $userId
      title: $title
      cost: $cost
      date: $date
      categoryIds: $categoryIds
    ) {
      expenseId
      title
      cost
      date
    }
  }
`;
const UPDATE_EXPENSE = gql`
  mutation UpdateExpense(
    $expenseId: ID!
    $title: String!
    $cost: Float!
    $date: String!
    $categoryIds: [ID!]!
  ) {
    updateExpense(
      expenseId: $expenseId
      title: $title
      cost: $cost
      date: $date
      categoryIds: $categoryIds
    ) {
      expenseId
      title
      cost
      date
    }
  }
`;
const DELETE_EXPENSE = gql`
  mutation DeleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId)
  }
`;
const Dashboard = () => {
  const { userId } = useOutletContext() || {};
  const [frequency, setFrequency] = useState("lastWeek");
  const [type, setType] = useState("all");
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Fetch expenses
  const {
    data,
    loading,
    error: queryError,
    refetch,
  } = useQuery(GET_USER_EXPENSES, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Please sign in again.");
    } else if (data) {
      setExpenses(data.getUserExpenses);
    } else if (queryError) {
      setError(queryError.message);
    }
  }, [data, queryError, userId]);

  // Add Expense Mutation
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleAddExpense = (newExpense) => {
    createExpense({
      variables: {
        userId,
        title: newExpense.title,
        cost: newExpense.amount,
        date: newExpense.date,
        categoryIds: newExpense.categoryIds,
      },
    })
      .then(() => setOpen(false))
      .catch((error) => console.error("Error creating expense:", error));
  };

  // Update Expense Mutation
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleUpdateExpense = (expense) => {
    updateExpense({
      variables: {
        expenseId: expense.expenseId,
        title: expense.title,
        cost: expense.amount,
        date: expense.date,
        categoryIds: expense.categoryIds,
      },
    }).catch((error) => console.error("Error updating expense:", error));
  };

  // Delete Expense Mutation
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleDeleteExpense = (expenseId) => {
    setExpenseToDelete(expenseId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteExpense = () => {
    deleteExpense({ variables: { expenseId: expenseToDelete } });
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Expense Management System
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <MenuItem value="lastWeek">Last Week</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="lastYear">Last Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Add New Expense Button */}
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
        Add New Expense
      </Button>

      {/* Loading State */}
      {loading ? (
        <CircularProgress />
      ) : (
        <ExpenseTable
          expenses={expenses}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setOpen(true);
          }}
          onDelete={handleDeleteExpense}
          onUpdate={handleUpdateExpense}
        />
      )}

      {/* Confirm Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this expense?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteExpense} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add or Edit Expense Dialog */}
      <AddExpense
        open={open}
        handleClose={() => setOpen(false)}
        addExpense={selectedExpense ? handleUpdateExpense : handleAddExpense}
        userId={userId}
        initialData={selectedExpense}
      />
    </Box>
  );
};

export default Dashboard;
