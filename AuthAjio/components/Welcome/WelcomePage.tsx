import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANBAJIO_RED = '#FF6B6B';
const BANBAJIO_PURPLE = '#7A40B9';

interface WelcomePageProps {
  onSecurityMethodSelect: (method: 'biometry' | '2fa') => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSecurityMethodSelect }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BANBAJIO_RED} barStyle="light-content" />
      
      {/* Red Banner with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/images/BanBajío_Logotipo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
        <Text style={styles.welcomeSubtitle}>Nuevo usuario, por favor selecciona tu método de seguridad preferido</Text>
        
        <View style={styles.securityOptionsContainer}>
          <TouchableOpacity 
            style={styles.securityOption}
            onPress={() => onSecurityMethodSelect('biometry')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="scan-outline" size={40} color="white" />
            </View>
            <Text style={styles.optionTitle}>Biometría</Text>
            <Text style={styles.optionDescription}>
              Usa tu huella digital o reconocimiento facial para autenticar operaciones
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.securityOption}
            onPress={() => onSecurityMethodSelect('2fa')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="key-outline" size={40} color="white" />
            </View>
            <Text style={styles.optionTitle}>Autenticación de dos factores</Text>
            <Text style={styles.optionDescription}>
              Recibe un código de verificación en tu dispositivo para autenticar operaciones
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.noteText}>
          Nota: Podrás cambiar tu método de seguridad más adelante en la configuración de la aplicación
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: BANBAJIO_RED,
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    height: 40,
    width: 140,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    color: '#CCC',
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  securityOptionsContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  securityOption: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    width: '90%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BANBAJIO_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionDescription: {
    color: '#AAA',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  noteText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});

export default WelcomePage; 