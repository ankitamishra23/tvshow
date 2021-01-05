export const getTvShows = ()=> {
    return new Promise ((resolve,reject)=>{
        fetch("https://api.tvmaze.com/shows")
        .then((response) => response.json())
        .then((results) => {
            console.log(results);
    
        resolve(results);
        });
    });
   
}

export const getTvSearch = (event)=> {
    const url = "http://api.tvmaze.com/search/shows?q=" + event.target.value;

    return new Promise ((resolve,reject)=>{
        fetch (url)
        .then((response) => response.json())
        .then((results) => {
            console.log(results);
    
        resolve(results);
        });
    });
   

}