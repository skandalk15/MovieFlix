export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({ query }: any) => {
  const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers
  });
  if (!response.ok) {
    //  @ts-ignore
    throw new Error('Failed to fetch movies', response.statusText);
  }
  const data = await response.json();

  return data.results;
}

export const fetchMovieDetails = async (movie_id: string): Promise<MovieDetails> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}`;
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movie details')
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmE3OWIzYjFkZjFkOGIxMTljMjMzZDk4NzAxZTgxYyIsIm5iZiI6MTc1MDE5NTA3Mi40Njg5OTk5LCJzdWIiOiI2ODUxZGI4MDg3MmRjMWIyYzM5MmRmNDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X7NhCdCY4X-vydfuRqTbOZoP-Af9-MEJrlkHsNeGA5k'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));