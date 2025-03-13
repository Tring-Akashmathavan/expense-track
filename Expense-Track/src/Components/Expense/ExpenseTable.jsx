import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.expenseId}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.cost}</TableCell>
              <TableCell>
                {expense.categories.map((cat) => cat.categoryName).join(", ")}
              </TableCell>
              <TableCell>
                {/* Edit Button */}
                <IconButton onClick={() => onEdit(expense)}>
                  <Edit />
                </IconButton>

                {/* Delete Button */}
                <IconButton onClick={() => onDelete?.(expense.expenseId)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
