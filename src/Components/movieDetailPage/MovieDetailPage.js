import React, { Component } from "react";
import "../../index.css";
import Header from "../../common/Header";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

const classes = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    GridTemplateRow: "auto",
    gridGap: theme.spacing(5),
  },
  Grid: {
    textAlign: "justify",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export class MovieDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      loading: true,
    };
  }

  componentDidMount() {
    let id = this.props.location.pathname.split("/")[2];
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((response) => response.json())
      .then((details) => {
        console.log("moviedetails--", details);
        this.setState({
          movieDetails: details,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Container className={classes.root}>
        {this.state.loading ? (
          <center>Loading...</center>
        ) : (
          <div classname="movieDetails">
            <Header isSearch={false} />
            <div className="posterContainer" style={{ paddingTop: "3%" }}>
              <div className="poster" style={{ borderRadius: 5 }}>
                <Card>
                  <CardMedia
                    id="movieImg"
                    style={{ height: 550 }}
                    component="img"
                    image={this.state.movieDetails.image.original}
                  />
                  <CardContent style={{ textAlign: "justify" }}>
                    <span
                      style={{
                        backgroundColor: "#c70039",
                        borderRadius: "5px 5px 5px 5px",
                        width: "110px",
                      }}
                    >
                      <strong>{this.state.movieDetails.name}</strong>
                    </span>
                    <br />

                    <strong>
                      Premiered: {this.state.movieDetails.premiered}
                    </strong>
                    <br />
                    <Button
                      startIcon={<StarRoundedIcon />}
                      variant="contained"
                      color="primary"
                    >
                      {this.state.movieDetails.rating.average}
                    </Button>
                    <br />

                    <strong>
                      Genres:{" "}
                      {this.state.movieDetails.genres.map((genre, id) => {
                        return (
                          <span id="generes" key={id}>
                            {genre + " "}
                          </span>
                        );
                      })}
                    </strong>
                  </CardContent>
                </Card>
              </div>

              <div
                className="movieInfo"
                xs={8}
                style={{ textAlign: "justify" }}
              >
                <div className="summary">
                  <h3>
                   Description 
                  </h3>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.movieDetails.summary,
                    }}
                  ></div>
                </div>
                <Divider />
                <div>
                  <strong>Language:</strong>

                  {this.state.movieDetails.language}
                </div>
                <Divider />
                <div>
                  <strong>Runtime:</strong>
                  {this.state.movieDetails.runtime}
                </div>
                <Divider />
                <div className="schedule">
                  <span>
                    <strong>Schedule:</strong>
                  </span>
                  <br />
                  {this.state.movieDetails.schedule.time}
                  <br />
                  <strong>Days:</strong>
                  {this.state.movieDetails.schedule.days.map((day, id) => {
                    return <span key={id}>{day + " "}</span>;
                  })}
                </div>
                <Divider />
                <div className="status">
                  <strong>Status:</strong>
                  {this.state.movieDetails.status}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default MovieDetailPage;
