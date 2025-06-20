import { Movie, MovieDetails, SavedMovies, TrendingMovie } from '@/interfaces/interfaces';
import { Client, Databases, ID, Query } from 'appwrite';
//  track searches made by user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', query)]);
    //  console.log(result);
    //  check if record of search has already been stored
    //  if document is found increment searchCount field
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      )
    }
    //  if no document found -> creat a new document in appwrite database  -> initialize count to 1
    else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title
      })
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const saveMovie = async (movie: MovieDetails) => {
  try {
    const existing = await database.listDocuments(DATABASE_ID, SAVED_ID, [
      Query.equal('movie_id', movie.id)
    ]);
    if (existing.total > 0) {
      console.log('Movie already saved');
      return { status: 'already_saved' };
    }
    await database.createDocument(DATABASE_ID, SAVED_ID, ID.unique(), {
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
      release_date: movie.release_date
    });
    console.log('Movie Saved');
    return { status: 'saved' };
  } catch (err) {
    console.log(err);
    return { status: 'error', error: err };
  }
}

export const getSavedMovies = async (): Promise<SavedMovies[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_ID, [
      Query.orderDesc('$createdAt')
    ]);
    return result.documents as unknown as SavedMovies[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const removeSavedMovie = async (movieId: number) => {
  const result = await database.listDocuments(DATABASE_ID, SAVED_ID, [
    Query.equal('movie_id', movieId)
  ]);

  if (result.documents.length > 0) {
    const docId = result.documents[0].$id;
    await database.deleteDocument(DATABASE_ID, SAVED_ID, docId);
    return { status: 'removed' };
  }
  return { status: 'not_found' };
};

export const isMovieSaved = async (movieId: number) => {
  const result = await database.listDocuments(DATABASE_ID, SAVED_ID, [
    Query.equal('movie_id', movieId)
  ]);
  return result.documents.length > 0;
};

