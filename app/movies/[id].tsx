import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { saveMovie, removeSavedMovie, isMovieSaved } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-light-200 font-normal text-sm'>{label}</Text>
      <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
    </View>
  );
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (movie?.id) {
        const exists = await isMovieSaved(movie.id);
        setIsSaved(exists);
      }
    };
    checkSavedStatus();
  }, [movie]);

  const handleSaveToggle = async () => {
    if (!movie)
      return;
    try {
      if (isSaved) {
        const res = await removeSavedMovie(movie.id);
        if (res.status === 'removed') {
          setIsSaved(false);
        }
      } else {
        const res = await saveMovie(movie);
        if (res.status === 'saved' || res.status === 'already_saved') {
          setIsSaved(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}>
        <View>
          <Image
            className='w-full h-[550px]'
            resizeMode='stretch'
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <View className='w-full flex-row justify-between items-center'>
            <Text className='text-white font-bold text-xl flex-1'>{movie?.title}</Text>
            <TouchableOpacity onPress={handleSaveToggle} className='ml-4'>
              <Image
                source={isSaved ? icons.saved : icons.save}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>

          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-empty gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0) / 10}</Text>
            <Text className='text-light-200 text-xs'>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((genre) => genre.name).join(' - ') || 'N/A'} />

          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} mill`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue) / 1_000_000} mill`} />
          </View>

          <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />
        </View>

      </ScrollView>
      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg 
      py-3.5 flex flex-row items-center justify-center z-50'
        onPress={router.back}
      >
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieDetails;
const styles = StyleSheet.create({});
