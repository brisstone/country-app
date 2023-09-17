import React from "react";
import TableComponent from "../Components/CountryTable";
import CountriesData from "../countryData.json";

export default function Countries(props: any) {
  return (
    <div>
      <h1>Countries</h1>
      <TableComponent data={CountriesData.countries} {...props} />
    </div>
  );
}
