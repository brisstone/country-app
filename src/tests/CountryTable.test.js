import React from "react";
import { render, fireEvent, getByRole } from "@testing-library/react";
import CountryTable from "../Components/CountryTable";
import { countries } from "../countryData.json";
import userEvent from "@testing-library/user-event";

describe("CountryTable", () => {
  it("renders without crashing", () => {
    render(<CountryTable data={countries} />);
  });

  it("displays the default data correctly", () => {
    const { getByText } = render(<CountryTable data={countries} />);
    expect(getByText("Argentina")).toBeInTheDocument();
    expect(getByText("Albania")).toBeInTheDocument();
  });

  it("filters by continent correctly", async () => {
    const { getByText, getByTestId, findByRole, queryByText } = render(
      <CountryTable data={countries} />
    );

    // Find the select input by its label using a data-testid
    const filterLabel = getByTestId("filter-continent-label");

    // Verify that the label text is as expected
    expect(filterLabel).toHaveTextContent("Filter by Continent");

    // Find the dropdown element by its data-testid
    const filterDropdown = getByTestId("filter-continent-dropdown");

    // Simulate a change event to open the dropdown
    fireEvent.mouseDown(filterDropdown);

    userEvent.click(
      getByRole(getByTestId("filter-continent-dropdown"), "button")
    );


    // Find and click the specific option by its text

    const dropdownItem = await findByRole("option", { name: /na/i });

    //Check that Anguilla row appears
    userEvent.click(dropdownItem);
    expect(getByText("Anguilla")).toBeInTheDocument();

    // Check if a country from another continent is not displayed
    expect(queryByText("Country from Another Continent")).toBeNull();
  });


  it("sorts by name correctly", () => {
    const { getByText, getByTestId } = render(
      <CountryTable data={countries} />
    );
    const nameHeader = getByTestId("name-header");

    // Click on the name header to sort in descending order
    fireEvent.click(nameHeader);

    // Check if the first row now contains "Zimbakwe" (descending order)

    expect(getByText("ZW")).toBeInTheDocument();

    const tdElement1 = getByTestId("table-row-0-nameUn");
    expect(tdElement1).toContainHTML("ZW"); //
  });
});
