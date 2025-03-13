import React, { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import AddExpense from "./AddExpense";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [open, setOpen] = useState(false);

  // Open modal for adding/editing
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle adding new expense
  const addExpense = (newExpense) => {
    setExpenses((prev) => [...prev, { ...newExpense, expenseId: Date.now() }]);
  };

  // Handle editing expense
  const editExpense = (expense) => {
    setSelectedExpense(expense);
    handleOpen(); // Open the modal for editing
  };

  // Handle deleting expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.expenseId !== id));
  };

  return (
    <div>
      {/* Add/Edit Expense Modal */}
      <AddExpense
        open={open}
        handleClose={handleClose}
        addExpense={addExpense}
        userId={1}
      />

      {/* Expense Table */}
      <ExpenseTable
        expenses={expenses}
        onEdit={editExpense}
        onDelete={deleteExpense}
      />
    </div>
  );
};

export default ExpenseManager;
