import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

// GraphQL query to fetch categories
const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      categoryId
      categoryName
    }
  }
`;

const AddExpense = ({ open, handleClose, addExpense, userId, initialData }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  // Fetch categories using Apollo useQuery
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setAmount(initialData.amount?.toString() || "");
      setDate(initialData.date || "");
      setCategoryIds(initialData.categoryIds || []);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setCategoryIds([]);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title || !amount || !date || categoryIds.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      expenseId: initialData?.expenseId, // Include for update
      title,
      amount: parseFloat(amount),
      date,
      categoryIds,
    };

    addExpense({ ...newExpense, userId });
    handleClose(); // Close dialog after submitting
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {initialData ? "Edit Expense" : "Add New Expense"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Category Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          {loading ? (
            <CircularProgress size={24} />
          ) : error ? (
            <p style={{ color: "red" }}>Error loading categories</p>
          ) : (
            <Select
              multiple
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
            >
              {data?.getAllCategories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpense;
