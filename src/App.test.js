import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(
      <Select options={["Option 1", "Option 2"]} onChange={mockOnChange} />
    );

    expect(screen.getByPlaceholderText("Search or add...")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("selects and removes an item", () => {
    render(
      <Select options={["Option 1", "Option 2"]} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText("Remove Option 1"));
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  test("adds new item", () => {
    render(
      <Select options={["Option 1", "Option 2"]} onChange={mockOnChange} />
    );

    const input = screen.getByPlaceholderText("Search or add...");

    fireEvent.change(input, { target: { value: "Option 3" } });
    fireEvent.click(screen.getByText('Add "Option 3"'));
    
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith([
      "Option 1",
      "Option 2",
      "Option 3",
    ]);
  });

  test("handles Ctrl + A to select all items", () => {
    render(
      <Select options={["Option 1", "Option 2"]} onChange={mockOnChange} />
    );

    fireEvent.keyDown(document, { key: "a", ctrlKey: true });

    expect(mockOnChange).toHaveBeenCalledWith(["Option 1", "Option 2"]);
    expect(screen.getByText("Option 1")).toHaveClass("bg-blue-500");
    expect(screen.getByText("Option 2")).toHaveClass("bg-blue-500");
  });

  test("handles Ctrl + A to deselect all items", () => {
    render(
      <Select options={["Option 1", "Option 2"]} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    fireEvent.keyDown(document, { key: "a", ctrlKey: true });

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });
});
