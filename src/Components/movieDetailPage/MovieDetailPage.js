import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'
import Header from '../../common/Header'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const classes = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        GridTemplateRow: 'auto',
        gridGap: theme.spacing(5),
      },
      Grid: {
        textAlign: 'justify',
      },
    divider: {
        margin: theme.spacing(2, 0),
      },
    button: {
        margin: theme.spacing(1),
      },
    input: {
        display: 'none',
      },
  }));


export class MovieDetailPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            movieDetails: {},
            loading: true
        }
    }


    componentDidMount(){

        let id = this.props.location.pathname.split('/')[2];        
        fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
        .then((response) => response.json())
        .then((details) => {
            this.setState({
                movieDetails: details,
                loading: false
            });
        })
    }

    render() {
        return (
                <Container className={classes.root}>
                    {this.state.loading ? (
                    <div>Loading...</div>
                    ) : (
                    <div classname="movieDetails">
                         <Header isSearch={false}/>
                        <div  className="posterContainer" style={{paddingTop: '3%'}}>
                            <div className="poster" style={{borderRadius: 5}}>
                                <Card>
                                    <CardMedia
                                        id ="movieImg" style={{height:550}}
                                        component="img" 
                                        image={this.state.movieDetails.image.original}
                                    />
                                    <CardContent style={{textAlign: 'justify'}}>
                                        <span style={{"backgroundColor":"#c70039","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                          <strong>{this.state.movieDetails.name}</strong>
                                          </span>
                                       <br/>
                                        
                                            <strong>Premiered: {this.state.movieDetails.premiered}</strong>
                                        <br/>
                                        <Button startIcon={<StarRoundedIcon />} variant="contained" color="primary">
                                           {this.state.movieDetails.rating.average}
                                        </Button><br/>
                                       
                                            <strong>Genres: {this.state.movieDetails.genres.map((genre, id) => {
                                                return (
                                                    <span id="generes" key={id}>
                                                        {genre + ' '}
                                                    </span>
                                                    )
                                                }
                                            )}</strong>
                                       
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="movieInfo" xs={8} style={{textAlign: 'justify', }}>
                                <div className="summary">
                                  
                                        <h3 style={{"backgroundColor":"#3333ff","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>Description</h3>
                                    
                                    <br/>
                                    {this.state.movieDetails.summary}
                                </div>
                                <Divider />
                                <div className="language">
                                 
                                     <span style={{"backgroundColor":"#f57f17","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                         <strong>Language:</strong>
                                         </span>
                                   {this.state.movieDetails.language}
                                </div>
                                <Divider />
                                <div className="runtime">
                                  <span style={{"backgroundColor":"#1791f5","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                  <strong>Runtime:</strong>
                                  </span>
                                 {this.state.movieDetails.runtime}
            
                                </div>
                                <Divider />
                                <div className="schedule">
                                <span style={{"backgroundColor":"#008800 ","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                      <strong>Schedule:</strong>
                                      </span>
                                    <br/>
                                     {this.state.movieDetails.schedule.time}<br/>
                                     <span style={{"backgroundColor":"#ff3300","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                   
                                         <strong>Days:</strong>
                                         </span>
                                      {this.state.movieDetails.schedule.days.map((day, id) => {
                                        return (
                                            <span key={id}>
                                                {day + ' '}
                                            </span>
                                        )
                                    })}
                                </div>
                                <Divider />
                                 <div className="status">
                                 <span style={{"backgroundColor":"#800000","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                       <strong>Status:</strong>
                                       </span>
                                    
                                     {this.state.movieDetails.status}
                                </div>
                            </div>
                        </div>

                                  
                       
                    </div>)}
                    
                </Container>
        )
    }
}

export default MovieDetailPage
