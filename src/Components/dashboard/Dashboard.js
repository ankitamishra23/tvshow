import React, { Component } from "react";
import "../../index.css";
import Header from "../../common/Header";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import common from "../../common/common.css";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvShows: [],
      currentShows: [],
      currentPage: 1,
      totalPages: null,
      selectedGenre: "",
    };
  }

  componentDidMount() {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((results) => {
        console.log("results", results);
        const indexOfLastData = this.state.currentPage * 12;
        const indexOfFirstData = indexOfLastData - 12;
        sessionStorage.setItem("movieData", JSON.stringify(results));

        this.setState({
          tvShows: results,
          currentShows: results.slice(indexOfFirstData, indexOfLastData),
        });
      });
  }

 
  searchUpdated = (event) => {
    if (event.keycode !== 8 && event.target.value !== "") {
      const url = "http://api.tvmaze.com/search/shows?q=" + event.target.value;

      fetch(url)
        .then((response) => response.json())
        .then((results) => {
          const filteredData = results.map((row) => row.show);
          const indexOfLastData = this.state.currentPage * 12;
          const indexOfFirstData = indexOfLastData - 12;
          sessionStorage.setItem("movieData", JSON.stringify(filteredData));

          filteredData &&
            this.setState({
              tvShows: filteredData,
              currentShows: filteredData.slice(
                indexOfFirstData,
                indexOfLastData
              ),
            });
        });
    }
  };

  handleGenreChange = (event) => {
    this.setState({ selectedGenre: event.target.value });
  };

  render() {
    const { tvShows, currentShows  } = this.state;

    const filteredShows = !!this.state.selectedGenre
      ? currentShows.filter((item) =>
          item.genres.includes(this.state.selectedGenre)
        )
      : currentShows.sort(
          (show1, show2) => show2.rating.average - show1.rating.average
        );

    const totalShows = tvShows.length;

    return (
      <div>
        <Header headerOnchange={this.searchUpdated} isSearch={true} />

        <Select
          labelId="demo-simple-select-label"
          className="genre-select"
          displayEmpty={true}
          renderValue={() => this.state.selectedGenre || "Select a Genre"}
          onChange={this.handleGenreChange}
        >
          <MenuItem value="">Reset</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Science-Fiction">Science-Fiction</MenuItem>
          <MenuItem value="Thriller">Thriller</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Crime">Crime</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Espionage">Espionage</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Mystery">Mystery</MenuItem>
          <MenuItem value="Supernatural">Supernatural</MenuItem>
          <MenuItem value="Fantasy">Fantasy</MenuItem>
        </Select>
        {!!filteredShows.length ? (
          <>
            {!this.state.selectedGenre && (
              <h2 className="popular-shows">Popular Shows</h2>
            )}
            <div className="gridContainer" spacing={3}>
              {filteredShows.map((item, id) => {
                return (
                  <div
                    id="cardDiv"
                    key={id}
                    style={{ textAlign: "justify" }}
                    className="gridItem"
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/movieDetailPage/${item.id}`}
                    >
                      <div>
                        <CardMedia
                          style={{ height: 400 }}
                          component="img"
                          image={item && item.image && item.image.original}
                        />
                        <CardContent>
                          <span className="item">{item.name}</span>
                          <span className="premiered">
                            Premiered: {item.premiered}
                          </span>
                          <Button
                            startIcon={<StarRoundedIcon />}
                            variant="contained"
                            color="primary"
                          >
                            {item.rating.average}
                          </Button>
                        </CardContent>
                        <CardActions></CardActions>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
           
          </>
        ) : (
          <h1 className="no-shows-fallback">No Shows Found!!</h1>
        )}
      </div>
    );
  }
}
export default Dashboard;
