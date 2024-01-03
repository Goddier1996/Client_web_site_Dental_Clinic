import React from "react";
import { Form } from "react-bootstrap";



const SelectOptionSortReview = ({ onSelectionChange, sortReview }) => {

  let storedTheme = localStorage.getItem("theme");

  return (
    <div
      className={
        storedTheme === "light"
          ? "selectOptionsStyleDark"
          : storedTheme === "dark"
          ? "selectOptionsStyle"
          : ""
      }
    >
      <Form.Select
        aria-label="Default select example"
        onChange={onSelectionChange}
        value={sortReview}
      >
        <option hidden value="Select">
          Select Option's Sort Review's
        </option>

        <option
          hidden={sortReview === "Default" || sortReview == "Select"}
          value="Default"
        >
          Default show all Review's
        </option>

        <option hidden={sortReview === "High Like"} value="High Like">
          Top to Low Like's
        </option>

        <option hidden={sortReview === "Low like"} value="Low like">
          Low to Top Like's
        </option>
      </Form.Select>
    </div>
  );
};


export default SelectOptionSortReview;