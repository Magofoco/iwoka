/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render } from "@testing-library/react";
import Applications from "./Applications";
import SingleApplication from "./SingleApplication";
import App from "./App";
describe("Applications Component", () => {
  it("renders a list of applications", () => {
    const applications = [
      {
        id: 1,
        company: "Example Company",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        loan_amount: 5000,
        date_created: "2022-06-01",
        expiry_date: "2022-06-30",
        loan_type: "Personal Loan",
        avatar: "https://example.com/avatar.jpg",
        loan_history: [],
      },
      // Add more sample application objects if needed
    ];

    const { getByText } = render(
      <Applications
        applications={applications}
        isLoadingResults={false}
        isError={false}
      />
    );

    // Assert that the application data is rendered
    expect(getByText("Example Company")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("john.doe@example.com")).toBeInTheDocument();
    expect(getByText("£5,000")).toBeInTheDocument();
    expect(getByText("01-06-2022")).toBeInTheDocument();
    expect(getByText("30-06-2022")).toBeInTheDocument();
  });

  it("displays a loading skeleton when loading results", () => {
    const { container } = render(
      <Applications applications={[]} isLoadingResults={true} isError={false} />
    );

    // Assert that the loading skeleton is rendered
    expect(
      container.querySelector(".react-loading-skeleton")
    ).toBeInTheDocument();
  });

  it("displays an error message when an error occurs", () => {
    const { getByText } = render(
      <Applications applications={[]} isLoadingResults={false} isError={true} />
    );

    // Assert that the error message is rendered
    expect(getByText("Something went wrong")).toBeInTheDocument();
  });
});

describe("SingleApplication Component", () => {
  it("renders application data correctly", () => {
    const application = {
      id: 1,
      company: "Example Company",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      loan_amount: 5000,
      date_created: "2022-06-01",
      expiry_date: "2022-06-30",
    };

    const { getByText } = render(<SingleApplication {...application} />);

    // Assert that the application data is rendered
    expect(getByText("Example Company")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("john.doe@example.com")).toBeInTheDocument();
    expect(getByText("£5,000")).toBeInTheDocument();
    expect(getByText("01-06-2022")).toBeInTheDocument();
    expect(getByText("30-06-2022")).toBeInTheDocument();
  });
});
