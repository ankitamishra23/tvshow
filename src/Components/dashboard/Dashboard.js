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
import { getTvSearch, getTvShows } from "../../service/dashboard.service";

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
    getTvShows().then((results) => {
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

      getTvSearch(event).then((results) => {
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

      })
    }
  };

  handleGenreChange = (event) => {
    if (event.target.value === "Reset") {
      event.target.value = "";
    }
    this.setState({ selectedGenre: event.target.value });
  };

  render() {

    const movieItems = ['Reset', 'Drama', 'Science-Fiction', 'Thriller', 'Action', 'Crime', 'Horror',
      'Romance', 'Adventure', 'Espionage', 'Music', 'Mystery', 'Supernatural', 'Fantasy'
    ]
    const { currentShows } = this.state;

    const filteredShows = !!this.state.selectedGenre
      ? currentShows.filter((item) =>
        item.genres.includes(this.state.selectedGenre)
      )
      : currentShows.sort(
        (show1, show2) => show2.rating.average - show1.rating.average
      );

    const movieitem1 = movieItems.map((movie) => {
      return <MenuItem value={movie}>{movie}</MenuItem>

    });

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
          {movieitem1}
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
