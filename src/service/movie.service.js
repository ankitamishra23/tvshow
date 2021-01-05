export const getmovie = (id) => {
    return new Promise ((resolve,reject)=>{
        fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
        .then((response) => response.json())
        .then((results) => {
            console.log(results);
    
        resolve(results);
        })
    });

}