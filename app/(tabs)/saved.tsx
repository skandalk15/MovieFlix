import React, { useEffect } from 'react';
import { icons } from '@/constants/icons';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import { getSavedMovies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import { useIsFocused } from '@react-navigation/native';

const Saved = () => {
  const isFocused = useIsFocused();
  const { data: savedMovies, loading, error, refetch } = useFetch(getSavedMovies);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" className="mt-10" />
      ) : error ? (
        <Text className="text-red-500 mt-10 text-center">{error.message}</Text>
      ) : savedMovies?.length == 0 ? (
        <View className="flex-1 justify-center items-center">
          <Image source={icons.save} className="w-10 h-10 mb-4" tintColor="#fff" />
          <Text className="text-base text-gray-500">No saved movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={savedMovies}
          renderItem={({ item }) =>
            <MovieCard
              id={item.movie_id}
              title={item.title}
              poster_path={item.poster_url}
              vote_average={item.vote_average}
              release_date={item.release_date}
            />}
          keyExtractor={(item) => item.movie_id.toString()}
          className="px-5"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
          ListHeaderComponent={
            <View className="w-full flex-row justify-center mt-10 nb-5 items-center">
              <Image source={icons.save} className="w-8 h-8" tintColor="#fff" />
              <Text className="text-white font-bold text-xl ml-2">Saved Movies</Text>
            </View>
          }
        />
      )}
    </View >
  );
}
export default Saved;

