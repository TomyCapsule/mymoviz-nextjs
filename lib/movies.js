// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ip = "http://mymoviz-nextjs-awca53zu5-tomycapsule.vercel.app/api/movies";
const MOVIEDB_KEY = process.env.MOVIEDB_KEY;

if (!MOVIEDB_KEY) {
  throw new Error(
    'Please define the MOVIEDB_KEY environment variable inside .env.local'
  )
}

export async function getMovies() {
  let getMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
  getMovies = await getMovies.json();
  return getMovies;
}

export async function getMovieCast(id) {
  let getMovieCast = await fetch(` https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MOVIEDB_KEY}&language=fr-FR`);
  getMovieCast = await getMovieCast.json();
  console.log('getMovieCastFromLib: ',getMovieCast)
  return getMovieCast;
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
  let response = await rawResponse.json();
  if(response){
    return {result: true}
  }else{
    return {result: false}
  }
}

export async function deleteFromWishlist(name){
  let rawResponse = await fetch(ip,{
    method:'DELETE',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}`
  })
  let response = await rawResponse.json();
  if(response){
    return {result: true}
  }else{
    return {result: false}
  }
}
