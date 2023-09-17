import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableSortLabel,
  Theme,
  Box,
  createTheme,
} from "@mui/material";

import { makeStyles, createStyles } from "@mui/styles";
import TablePagination from "@mui/material/TablePagination";


// Define a theme
const theme = createTheme();

// Define custom styles
const useStyles = makeStyles(() =>
  createStyles({
    filterContainer: {
      marginBottom: theme.spacing(2),
      display: "flex",
      columnGap: theme.spacing(2),
      justifyContent: "center",
      alignItems: "center",
      // Apply column direction for screens with a max width of 500px
      "@media (max-width: 500px)": {
        flexDirection: "column",
        rowGap: theme.spacing(1),
      },
    },
    tableComponentBody: {
      marginBottom: theme.spacing(2),
      padding: "50px 100px",
      "@media (max-width: 500px)": {
        marginBottom: theme.spacing(1),
        padding: "25px 30px",
      },
    },
    tableContainer: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
    filterFormControl: {
      margin: theme.spacing(1),
      minWidth: 180,
      "@media (max-width: 500px)": {
        width: "100%",
      },
    },
    filterLabel: {
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
    tableHeadRow: {
      background: "#FF8501", // Set the background color for the table head row
    },
    tableRow: {
      "&:hover": {
        background: "#f5f5f5", // Apply a hover effect on table rows
        cursor: "pointer",
      },
    },
  })
);

/**
 * Interface representing a country.
 * @interface Country
 * @property {string} id - The ID of the country.
 * @property {string} code - The country code.
 * @property {string} name - The name of the country.
 * @property {string} nameUn - The official name of the country.
 * @property {string} continent - The continent to which the country belongs.
 * @property {boolean} hasStates - Indicates whether the country has states.
 */

interface Country {
  id: string;
  code: string;
  name: string;
  nameUn: string;
  continent: string;
  hasStates: boolean;
}

/**
 * Props for the `CountryTable` component.
 * @interface CountryTableProps
 * @property {Country[]} data - An array of country objects to display in the table.
 */

export interface CountryTableProps {
  data: Country[];
  defaultFilter?: string; 
  sortConfig?: {
    key: string;
    direction: string;
  }; 
}

const rowsPerPageOptions = [10, 25, 50]; // Options for rows per page

const CountryTable: React.FC<CountryTableProps> = (props) => {
  const { data, defaultFilter } = props;

  // if defaultFilter props is null, make it an empty string
  const [filterContinent, setFilterContinent] = useState<string>(defaultFilter?? "");
  const [filterHasStates, setFilterHasStates] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "nameUn",
    direction: "asc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Create a variable to store the custom styles function
  const classes = useStyles(props); // Apply custom styles

  // Extract unique continents from the data
  const uniqueContinents = useMemo(() => {
    return Array.from(new Set(data.map((country) => country.continent)));
  }, [data]);

  // Memoize the filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    const filteredData = data.filter(
      (country) =>
        country.continent
          .toLowerCase()
          .includes(filterContinent.toLowerCase()) &&
        (filterHasStates === "" ||
          String(country.hasStates).toLowerCase() ===
            filterHasStates.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
      if (
        a[sortConfig.key as keyof Country] < b[sortConfig.key as keyof Country]
      ) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (
        a[sortConfig.key as keyof Country] > b[sortConfig.key as keyof Country]
      ) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  }, [data, filterContinent, filterHasStates, sortConfig]);

  
  /**
   * Handles sorting of table columns.
   * @param {string} key - The key by which to sort the table.
   */
  const handleSort = (key: string) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        key,
        direction: "asc",
      });
    }
  };

  /**
   * Checks if the table is sorted by a specific column.
   * @param {string} column - The column key to check.
   * @returns {boolean} True if the table is sorted by the given column; otherwise, false.
   */
  const isSortedBy = (column: string) => column === sortConfig.key;
  

  /**
   * Handles the change of the current page.
   * @param {React.MouseEvent<HTMLButtonElement> | null} event - The event that triggered the page change.
   * @param {number} newPage - The new page number.
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  /**
   * Handles the change of rows per page.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The event that triggered the rows per page change.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.tableComponentBody}>
      <Box className={classes.filterContainer}>
        <FormControl variant="outlined" className={classes.filterFormControl}>
          <InputLabel className={classes.filterLabel}>
            Filter by Continent
          </InputLabel>
          <Select
            value={filterContinent}
            onChange={(e) => setFilterContinent(e.target.value as string)}
            label="Filter by Continent"
            style={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueContinents.map((continent) => (
              <MenuItem key={continent} value={continent}>
                {continent}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterFormControl}>
          <InputLabel className={classes.filterLabel}>
            Filter by hasStates
          </InputLabel>
          <Select
            value={filterHasStates}
            onChange={(e) => setFilterHasStates(e.target.value as string)}
            label="Filter by hasStates"
            style={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell>S/N</TableCell>
              <TableCell>
                <TableSortLabel
                  active={isSortedBy("id")}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("id")}
                  hideSortIcon={!isSortedBy("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Code</TableCell>
              <TableCell>
                <TableSortLabel
                  active={isSortedBy("nameUn")}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("nameUn")}
                  hideSortIcon={!isSortedBy("nameUn")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={isSortedBy("continent")}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("continent")}
                  hideSortIcon={!isSortedBy("continent")}
                >
                  Continent
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={isSortedBy("hasStates")}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("hasStates")}
                  hideSortIcon={!isSortedBy("hasStates")}
                >
                  Has States
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country, index) => (
                <TableRow key={country.id} className={classes.tableRow}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{country.id}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>{country.nameUn}</TableCell>
                  <TableCell>{country.continent}</TableCell>
                  <TableCell>{country.hasStates ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredAndSortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CountryTable;
