import React from 'react';
import { icons } from '@/constants/icons';
import { View, Text, StyleSheet, Image } from 'react-native';

const Saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.save} className='size-10' tintColor='#Fff' />
        <Text className='text-base text-gray-500'>Save</Text>
      </View>
    </View>
  );
}

export default Saved;
const styles = StyleSheet.create({});
