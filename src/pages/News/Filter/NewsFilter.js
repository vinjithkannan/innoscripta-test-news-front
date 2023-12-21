import React, { useEffect, useState } from "react";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Checkbox } from "@mui/material";
import MKButton from "components/MKButton";

// eslint-disable-next-line react/prop-types, no-unused-vars
const NewsFilter = ({ handleFilter }) => {
  const httpClient = axios.create({
    baseURL: "http://localhost/api/",
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [checkCategorySelection, setCheckCategorySelection] = useState([]);
  const [checkAuthorSelection, setCheckAuthorSelection] = useState([]);
  const [checkSourceSelection, setCheckSourceSelection] = useState([]);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    getFilters();
  }, []);
  const getFilters = () => {
    try {
      httpClient.get("authors").then((responseAuthors) => {
        setAuthors(responseAuthors.data);
      });
      httpClient.get("categories").then((responseCategories) => {
        setCategories(responseCategories.data);
      });
      httpClient.get("sources").then((responseSources) => {
        setSources(responseSources.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleCategoryChange(e) {
    if (e.currentTarget.checked) {
      setCheckCategorySelection([...checkCategorySelection, e.target.value]);
    } else {
      const newArr = checkCategorySelection.filter((item) => item !== e.target.value);
      setCheckCategorySelection(newArr);
    }
    applyFilters();
  }

  function handleAuthorChange(e) {
    if (e.currentTarget.checked) {
      setCheckAuthorSelection([...checkAuthorSelection, e.target.value]);
    } else {
      const newArr = checkAuthorSelection.filter((item) => item !== e.target.value);
      setCheckAuthorSelection(newArr);
    }
    applyFilters();
  }

  function handleSourceChange(e) {
    if (e.currentTarget.checked) {
      setCheckSourceSelection([...checkSourceSelection, e.target.value]);
    } else {
      const newArr = checkSourceSelection.filter((item) => item !== e.target.value);
      setCheckSourceSelection(newArr);
    }
    applyFilters();
  }

  function applyFilters() {
    const filtersArray = {
      filters: {
        authors: checkAuthorSelection,
        categories: checkCategorySelection,
        sources: checkSourceSelection,
      },
    };
    setFilters(filtersArray);
  }

  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="top">
          <Grid item xs={12} lg={12}>
            <MKTypography variant="h3" fontWeight="bold" mb={1}>
              Filters
            </MKTypography>
            <MKButton size="medium" color="secondary" onClick={() => handleFilter(filters)}>
              Apply Filters
            </MKButton>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKTypography>Authors</MKTypography>
            {authors?.length ? (
              authors.map((author, id) => {
                return (
                  <div key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      value={author.id}
                      onChange={handleAuthorChange}
                    />
                    <label htmlFor={id}>{author.name}</label>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
            <MKTypography>Categories</MKTypography>
            {categories?.length ? (
              categories.map((category, id) => {
                return (
                  <div key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      value={category.id}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={id}>{category.title}</label>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
            <MKTypography>Sources</MKTypography>
            {sources?.length ? (
              sources.map((source, id) => {
                return (
                  <div key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      value={source.id}
                      onChange={handleSourceChange}
                    />
                    <label htmlFor={id}>{source.title}</label>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
};

export default NewsFilter;
