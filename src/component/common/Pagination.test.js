import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  test("renders correct number of page buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  test("highlights the active page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    const activeButton = screen.getByText("3");

    expect(activeButton).toHaveStyle({
      background: "#1a73e8",
      color: "#fff",
    });
  });

  test("calls onPageChange with correct page number when clicked", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText("4"));

    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  test("does not break when currentPage is last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
