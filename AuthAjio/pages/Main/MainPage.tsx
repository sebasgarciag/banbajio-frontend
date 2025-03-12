import React from 'react';
import MainPageComponent from '@/components/Main/MainPage';
import { useRoute } from '@react-navigation/native';

const MainPage = () => {
  const route = useRoute();
  return <MainPageComponent />;
};

export default MainPage; 