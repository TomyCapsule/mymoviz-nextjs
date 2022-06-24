// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ip = "http://localhost:3000/api/movies"

export async function getMovies() {
  let getMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=48f8b272782d8a88ab2a9da677680b93&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate');
  getMovies = await getMovies.json();
  return getMovies;
}

export async function getWishlist(){
  let getWishlist = await fetch(ip)
  getWishlist = await getWishlist.json();
  return getWishlist
}

export async function addToWishlist(name,imgUrl){
  let rawResponse = await fetch(ip,{
    method:'post',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}&img=${imgUrl}`
  })
}

export async function deleteFromWishlist(name){
  let rawResponse = await fetch(ip,{
    method:'DELETE',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}`
  })
}
