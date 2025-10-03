import { render, screen } from "@testing-library/react";
import LeadsTable from "../components/LeadsTable";
import { vi, test, expect, beforeEach } from "vitest";

beforeEach(() => {

  vi.restoreAllMocks();

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: "Alice", company: "TechCorp", email: "a@x.com", score: 90, status: "New" },
          { id: 2, name: "Bob", company: "SoftHouse", email: "b@x.com", score: 75, status: "Contacted" },
        ]),
    })
  );
});

test("renders leads from JSON", async () => {
  render(<LeadsTable onSelectLead={() => {}} />);

  const aliceEls = await screen.findAllByText("Alice");
  expect(aliceEls.length).toBeGreaterThan(0);

  const bobEls = await screen.findAllByText("Bob");
  expect(bobEls.length).toBeGreaterThan(0);
});

