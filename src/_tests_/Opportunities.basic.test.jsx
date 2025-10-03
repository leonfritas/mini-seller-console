import { render, screen } from "@testing-library/react";
import OpportunitiesTable from "../components/OpportunitiesTable";
import { test, expect } from "vitest";

test("renders opportunities table with data", () => {
  const fakeOpps = [
    { id: 1, name: "Alice", stage: "New", amount: 1000, accountName: "TechCorp" },
  ];

  render(<OpportunitiesTable opportunities={fakeOpps} />);

  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("TechCorp")).toBeInTheDocument();
  expect(screen.getByText("1000")).toBeInTheDocument();
});
