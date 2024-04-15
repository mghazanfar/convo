import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

test("1- renders app", async () => {
  render(<App />);
  const appContainer = screen.getByTestId("app-container");
  await waitFor(() => expect(appContainer).toBeInTheDocument());
});

test("2- renders app convo logo", () => {
  render(<App />);
  const convoLogo = screen.getByAltText("logo");
  expect(convoLogo).toBeInTheDocument();
});

test("3- renders app form", () => {
  render(<App />);
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();
});

test("4- renders app empty form", () => {
  render(<App />);
  const form = screen.getByTestId("form");

  expect(form).toHaveFormValues({ title: "", "upvotes-count": "", date: "" });
});

test("5- renders data grid with 1 item", () => {
  render(<App />);

  const inputTitle = screen.getByPlaceholderText("Enter title...");
  fireEvent.change(inputTitle, {
    target: { value: "Title: First testing element" },
  });

  const inputUpvotesCount = screen.getByPlaceholderText(
    "Enter upvotes number between 0 to 100"
  );
  fireEvent.change(inputUpvotesCount, { target: { value: 200 } });

  const inputDate = screen.getByPlaceholderText("Enter Date");
  fireEvent.change(inputDate, { target: { value: new Date() } });

  const submitButton = screen.getByRole("button", { name: "submit" });
  fireEvent.click(submitButton);

  const row0 = screen.getByTestId("Title: First testing element0");
  expect(row0).toBeInTheDocument();
});

test("6- search item in the table", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");
  fireEvent.change(searchInput, {
    target: { value: "first testing" },
  });
  waitForElementToBeRemoved(() => screen.getByTestId("loading"));
  const row0 = screen.getByTestId("Title: First testing element0");
  expect(row0).toBeInTheDocument();
});
