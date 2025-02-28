import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TransferScreen from '../Transfer/TransferScreen';

const BANBAJIO_PURPLE = '#7A40B9';
const BANBAJIO_RED = '#FF6B6B'; 
const INITIAL_BALANCE = 100000.00; // Set initial balance to $100,000

const MainPage = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [availableBalance, setAvailableBalance] = useState(INITIAL_BALANCE);

  // Function to handle navigation back from TransferScreen
  const handleBackFromTransfer = () => {
    setCurrentScreen('main');
  };

  // Function to handle completed transfers and update balance
  const handleTransferComplete = (amount: number) => {
    setAvailableBalance(prevBalance => Math.max(0, prevBalance - amount));
  };

  // If the current screen is 'transfer', show the TransferScreen
  if (currentScreen === 'transfer') {
    return (
      <TransferScreen 
        onBack={handleBackFromTransfer} 
        availableBalance={availableBalance}
        onTransferComplete={handleTransferComplete}
      />
    );
  }

  // Format the balance with commas for thousands
  const formattedBalance = availableBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

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
      
      <ScrollView style={styles.scrollView}>
        {/* Account Section */}
        <View style={styles.accountSection}>
          <View style={styles.accountHeader}>
            <Text style={styles.accountTitle}>Cuenta</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          <Text style={styles.accountBalance}>${formattedBalance}</Text>
        </View>

        {/* Action Buttons - Only Recibir and Transferir */}
        <View style={styles.actionButtonsContainer}>
          <View style={styles.actionButtonColumn}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionButtonIcon, { backgroundColor: BANBAJIO_RED }]}>
                <FontAwesome name="money" size={32} color="white" />
              </View>
              <Text style={styles.actionButtonLabel}>Recibir</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionButtonColumn}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setCurrentScreen('transfer')}
            >
              <View style={[styles.actionButtonIcon, { backgroundColor: '#333' }]}>
                <Ionicons name="arrow-up-outline" size={32} color="white" />
              </View>
              <Text style={styles.actionButtonLabel}>Transferir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Credit Card Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Tarjeta de crédito</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardLabel}>Saldo actual</Text>
            <Text style={styles.cardBalance}>$5,000.00</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>Fecha de corte: 16 MAR</Text>
            <Text style={styles.cardInfoText}>Límite disponible: $45,000.00</Text>
          </View>
          <TouchableOpacity style={styles.deferButton}>
            <Text style={styles.deferButtonText}>Ver detalles de tarjeta</Text>
          </TouchableOpacity>
        </View>

        {/* My Cards Section */}
        <View style={styles.myCardsSection}>
          <TouchableOpacity style={styles.myCardsButton}>
            <View style={styles.myCardsContent}>
              <View style={styles.myCardsIconContainer}>
                <MaterialIcons name="credit-card" size={28} color="white" />
              </View>
              <View style={styles.myCardsTextContainer}>
                <Text style={styles.myCardsTitle}>Mis Tarjetas</Text>
                <Text style={styles.myCardsSubtitle}>Administra todas tus tarjetas</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Extra Space at Bottom */}
        <View style={styles.bottomSpace} />
      </ScrollView>
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
    justifyContent: 'flex-start',
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
  scrollView: {
    flex: 1,
  },
  accountSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountBalance: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  actionButtonColumn: {
    alignItems: 'center',
    width: '40%',
    marginBottom: 20,
    position: 'relative',
  },
  actionButton: {
    alignItems: 'center',
    position: 'relative',
  },
  actionButtonIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  actionButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDetails: {
    marginBottom: 10,
  },
  cardLabel: {
    color: '#999',
    fontSize: 14,
  },
  cardBalance: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardInfo: {
    marginBottom: 20,
  },
  cardInfoText: {
    color: '#999',
    fontSize: 14,
    marginBottom: 5,
  },
  deferButton: {
    backgroundColor: BANBAJIO_RED,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  deferButtonText: {
    color: 'white',
    fontSize: 16,
  },
  myCardsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  myCardsButton: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  myCardsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myCardsIconContainer: {
    backgroundColor: BANBAJIO_RED,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  myCardsTextContainer: {
    flex: 1,
  },
  myCardsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  myCardsSubtitle: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  bottomSpace: {
    height: 30,
  },
});

export default MainPage; 