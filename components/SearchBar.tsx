import { icons } from '@/constants/icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

//  Tells React Native what type the props need to be
interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Searchbar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'></Image>
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
      />
    </View>
  );
}

export default Searchbar;
const styles = StyleSheet.create({});
