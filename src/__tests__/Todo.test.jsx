import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("TodoApp Component", () => {
    test("renders correctly", () => {
        render(<App />);
        expect(screen.getByText("To-Do List")).toBeInTheDocument();
    });

    test("adds a new task", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");
        
        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(addButton);
        
        expect(screen.getByText("New Task")).toBeInTheDocument();
    });

    test("toggles task completion", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");
        
        fireEvent.change(input, { target: { value: "Task 1" } });
        fireEvent.click(addButton);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        
        expect(screen.getByText("Task 1")).toHaveClass("line-through");
    });

    test("edits a task", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");
        
        fireEvent.change(input, { target: { value: "Task to Edit" } });
        fireEvent.click(addButton);
        
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);
        const editInput = screen.getByDisplayValue("Task to Edit");
        fireEvent.change(editInput, { target: { value: "Edited Task" } });
        fireEvent.blur(editInput);
        
        expect(screen.getByText("Edited Task")).toBeInTheDocument();
    });

    test("deletes a task", () => {
        window.confirm = jest.fn(() => true);
        render(<App />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");
        
        fireEvent.change(input, { target: { value: "Task to Delete" } });
        fireEvent.click(addButton);
        
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);
        
        expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
    });

    test("clears all tasks", () => {
        window.confirm = jest.fn(() => true);
        render(<App />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");
        const clearButton = screen.getByText("Clear All");
        
        fireEvent.change(input, { target: { value: "Task 1" } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: "Task 2" } });
        fireEvent.click(addButton);
        fireEvent.click(clearButton);
        
        expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    });
});
