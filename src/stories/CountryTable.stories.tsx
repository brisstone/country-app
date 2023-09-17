import React from "react";
import { Story, Meta } from "@storybook/react";
import CountryTable, { CountryTableProps } from "../Components/CountryTable"; // Adjust the import path based on your project structure
import countriesData from '../countryData.json'

// Export of the component's metadata for Storybook
export default {
  title: "CountryTable",
  component: CountryTable,
} as Meta;

// Define the Template for the component
const Template: Story<CountryTableProps> = (args) => <CountryTable {...args} />;

// Default View
export const DefaultView = Template.bind({});
DefaultView.args = {
  data: countriesData.countries,
};

// Empty State
export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
};

// Filtered by Continent North America
export const FilteredByContinent = Template.bind({});
FilteredByContinent.args = {
  data: countriesData.countries,
  defaultFilter: "NA", //Sample country to filter
};

// Sorted by Name
export const SortedByName = Template.bind({});
SortedByName.args = {
  data: countriesData.countries,
  sortConfig: {
    key: "nameUn",
    direction: "asc", // Ascending sorting direction
  },
};
