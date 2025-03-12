import React from 'react';
import WelcomePageComponent from '@/components/Welcome/WelcomePage';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation<any>();

  const handleSecurityMethodSelect = (method: 'biometry' | '2fa') => {
    // Navigate to the main page with the selected security method as a parameter
    navigation.navigate('main', { securityMethod: method });
  };

  return (
    <WelcomePageComponent onSecurityMethodSelect={handleSecurityMethodSelect} />
  );
};

export default WelcomePage; 