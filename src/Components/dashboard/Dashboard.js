import React, { Component } from 'react'
import '../../index.css'
import Pagination from 'react-js-pagination';
import SearchInput, { createFilter } from 'react-search-input'
import Header from '../../common/Header'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { Link } from 'react-router-dom';

export class Dashboard extends Component{

    constructor(props){
        super(props)
        this.state = {
            tvShows: [],
            currentShows: [],
             currentPage: 1,
            totalPages: null
        }
    }
   

    componentDidMount(){
        fetch("https://api.tvmaze.com/shows")
        .then((response) => response.json())
        .then((results) => {

            const indexOfLastData = this.state.currentPage * 10; // 2 *  10 = 20 
            const indexOfFirstData = indexOfLastData - 10;
            sessionStorage.setItem("movieData", JSON.stringify(results));

            this.setState({
                tvShows: results,
                currentShows:results.slice(indexOfFirstData, indexOfLastData)
            });
        })
    }

       handlePageChange = (pageNumber) => {
        const currentPage = pageNumber;
        const indexOfLastData = pageNumber * 10;  
        const indexOfFirstData = indexOfLastData - 10;
        const currentShows = this.state.tvShows.slice(indexOfFirstData, indexOfLastData)       
        this.setState({ currentPage, currentShows });
    }

     searchUpdated = (event) => {
        console.log(event.target.value)
        const term = event.target.value;    
        if (term.length != 0) {
            const currentShows = this.state.tvShows.filter(function (el) {
                return (el.name.indexOf(term) >0);
              });
              console.log("newArray?????",currentShows);
            this.setState({currentShows });

        }      
    }
 render (){


    const { tvShows, currentShows, currentPage, totalPages } = this.state;

    const totalShows = tvShows.length;
   
    if (totalShows === 0) return null;



    return (
        <div>
            <Header headerOnchange={this.searchUpdated} isSearch={true}/>
           
            <div className="gridContainer" spacing={3}>
                        {currentShows.map((item, id) => {
                            return(
                                <div 
                                    id="cardDiv"
                                    key={id} 
                                    style={{textAlign: 'justify'}}
                                    className='gridItem' 
                                >
                                    <Link style={{ textDecoration: 'none' }} to={`/movieDetailPage/${item.id}`}  >
                                    <div>
                                        <CardMedia                                          
                                            style={{height:400}}
                                            component="img" 
                                            image={item.image.original} 
                                        />
                                        <CardContent>
                                            
                                        <span style={{"backgroundColor":"#c70039","color":"white","borderRadius" : "5px 5px 5px 5px", "width":"110px"}}>
                                                {item.name}
                                            </span>
                                            <br/>
                                            
                                            
                                                Premiered: {item.premiered}
                                             <br/>
                                            <Button startIcon={<StarRoundedIcon />} variant="contained" color="primary">
                                                {item.rating.average}
                                            </Button>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="pagination">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={10}
                                        totalItemsCount={tvShows.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div> 

                         
        </div>

    );
}
}
export default Dashboard;
