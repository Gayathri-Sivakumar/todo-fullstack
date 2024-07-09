import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup className="mb-3 search-bar-container">
      <FormControl
        placeholder="Search by title or status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar-input"
      />
    </InputGroup>
  );
};

export default SearchBar;
