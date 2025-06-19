import React from 'react';
import { icons } from '@/constants/icons';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.person} className='size-10' tintColor='#Fff' />
        <Text className='text-base text-gray-500'>Profile</Text>
      </View>
    </View>
  );
}

export default Profile;
const styles = StyleSheet.create({});
