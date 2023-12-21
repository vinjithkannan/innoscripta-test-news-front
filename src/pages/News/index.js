/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import bgImage from "assets/images/bg-presentation.jpg";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import { useCookies } from "react-cookie";
// eslint-disable-next-line no-unused-vars
import NewsFilter from "./Filter/NewsFilter";
import axios from "../../AxiosClient";
import { useAuth } from "contexts/AuthContext";

function News() {
  const { user } = useAuth();
  const [cookies] = useCookies(["token"]);
  const [newses, setNewses] = useState([]);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = (filters) => {
    try {
      axios.post("news", filters).then((response) => {
        setNewses(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleFilter = (filters) => {
    try {
      if (filters) {
        fetchNews(filters);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DefaultNavbar routes={routes} />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              NEWS
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              News .
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <Grid container spacing={3} alignItems="top">
            <Grid item xs={12} lg={3} position="sticky" top="100px">
              <NewsFilter handleFilter={handleFilter} />
            </Grid>
            <Grid item xs={12} lg={9}>
              <MKBox component="section" py={12}>
                <Container>
                  <Grid container spacing={3} alignItems="top">
                    {newses?.length ? (
                      newses.map((news, id) => {
                        return (
                          <Grid item xs={12} lg={3} key={id}>
                            <MKBox pb={{ xs: 2, lg: 6 }}>
                              <MKTypography variant="h4" fontWeight="bold" mb={1}>
                                {news.title}
                              </MKTypography>
                              <MKTypography
                                variant="body2"
                                fontWeight="regular"
                                color="secondary"
                                mb={1}
                                pr={2}
                              >
                                {news.summary}
                              </MKTypography>
                            </MKBox>
                          </Grid>
                        );
                      })
                    ) : (
                      <div>Loading...</div>
                    )}
                  </Grid>
                </Container>
              </MKBox>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default News;
