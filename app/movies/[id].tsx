import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { saveMovie } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import React, { useState } from 'react';
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

  const handleSave = async () => {
    if (!movie)
      return;
    try {
      const result = await saveMovie(movie);
      if (result.status === 'already_saved') {
        Toast.show({
          type: 'info',
          text1: 'Already saved ✅',
        });
        setIsSaved(true);
      } else if (result.status === 'saved') {
        Toast.show({
          type: 'success',
          text1: 'Movie saved 🎉',
        });
        setIsSaved(true);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error saving movie ❌',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred ❌',
      });
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
            <TouchableOpacity onPress={handleSave} className='ml-4'>
              <Image
                source={icons.save}
                //source={isSaved ? icons.check : icons.save}
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
