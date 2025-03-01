import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, TextInput, ActivityIndicator, Animated, Easing } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AddContactScreen from './AddContactScreen';
import TransferAmountScreen from './TransferAmountScreen';
import TransferConfirmationScreen from './TransferConfirmationScreen';

import { BANBAJIO_PURPLE, BANBAJIO_RED } from '../../constants/colors';

// Mock data for contacts
const INITIAL_CONTACTS = [
  { id: '1', initial: 'C', name: 'Carlos Hernández', bank: 'SANTANDER', account: '••••3842' },
  { id: '2', initial: 'J', name: 'Juan Pérez', bank: 'BANORTE', account: '••••5719' },
  { id: '3', initial: 'L', name: 'Laura Sánchez', bank: 'HSBC', account: '••••6023' },
  { id: '4', initial: 'R', name: 'Roberto González', bank: 'SCOTIABANK', account: '••••4157' },
  { id: '5', initial: 'S', name: 'Sofia Martínez', bank: 'INBURSA', account: '••••8294' },
  { id: '6', initial: 'E', name: 'Elena Rodríguez', bank: 'CITIBANAMEX', account: '••••7361' },
  { id: '7', initial: 'D', name: 'Daniel López', bank: 'BANBAJÍO', account: '••••5028' },
];

interface TransferScreenProps {
  onBack: () => void; // Function to navigate back to MainPage
  availableBalance: number; // Available balance for transfers
  onTransferComplete?: (amount: number) => void; // Function to update balance after transfer
}

const TransferScreen: React.FC<TransferScreenProps> = ({ 
  onBack, 
  availableBalance,
  onTransferComplete 
}) => {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showAmountScreen, setShowAmountScreen] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [transactionDate, setTransactionDate] = useState('');

  // Handle adding a new contact
  const handleAddContact = (newContact: any) => {
    setContacts([...contacts, newContact]);
    setShowAddContact(false);
  };

  // Handle contact selection
  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    setShowAmountScreen(true);
  };

  // Handle back from amount screen
  const handleBackFromAmount = () => {
    setShowAmountScreen(false);
    setSelectedContact(null);
  };

  // Handle transfer continuation (from amount screen to confirmation)
  const handleContinueTransfer = (amount: number) => {
    setTransferAmount(amount);
    setShowConfirmationScreen(true);
  };

  // Handle back from confirmation screen
  const handleBackFromConfirmation = () => {
    setShowConfirmationScreen(false);
  };

  // Handle final confirmation of transfer
  const handleConfirmTransfer = () => {
    // Show loading screen
    setIsLoading(true);
    
    // Generate current date and time for the transaction
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })} ${now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })}`.replace('.', '');
    
    setTransactionDate(formattedDate);
    
    // Simulate processing time (5-10 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setIsTransferComplete(true);
      
      // Update the balance in the parent component
      if (onTransferComplete) {
        onTransferComplete(transferAmount);
      }
    }, 5000); // 5 seconds
  };

  // Handle going back to main page after transfer is complete
  const handleBackToMain = () => {
    // Reset all states
    setShowConfirmationScreen(false);
    setShowAmountScreen(false);
    setSelectedContact(null);
    setTransferAmount(0);
    setIsTransferComplete(false);
    
    // Go back to main page
    onBack();
  };

  // If showing loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If showing transfer complete screen
  if (isTransferComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        
        {/* Header with Close Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToMain} style={styles.backButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={50} color="#4CD964" />
          </View>
        </View>
        
        {/* Transaction Details */}
        <View style={styles.transactionDetails}>
          <Text style={styles.recipientName}>{selectedContact?.bank.toLowerCase()} {selectedContact?.name.split(' ')[0].toLowerCase()}</Text>
          <Text style={styles.transactionAmount}>${transferAmount.toFixed(2)}</Text>
          <Text style={styles.transactionDate}>{transactionDate}</Text>
        </View>
        
        {/* Transaction Info */}
        <View style={styles.transactionInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estatus</Text>
            <Text style={styles.statusValue}>Aceptada</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo de transferencia</Text>
            <Text style={styles.infoValue}>SPEI</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // If showing add contact screen
  if (showAddContact) {
    return (
      <AddContactScreen 
        onBack={() => setShowAddContact(false)} 
        onAddContact={handleAddContact} 
      />
    );
  }

  // If showing confirmation screen
  if (showConfirmationScreen && selectedContact) {
    return (
      <TransferConfirmationScreen 
        onBack={handleBackFromConfirmation}
        onConfirm={handleConfirmTransfer}
        amount={transferAmount}
        contact={selectedContact}
      />
    );
  }

  // If showing amount screen
  if (showAmountScreen && selectedContact) {
    return (
      <TransferAmountScreen 
        onBack={handleBackFromAmount}
        contact={selectedContact}
        availableBalance={availableBalance}
        onContinue={handleContinueTransfer}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BANBAJIO_PURPLE} barStyle="light-content" />
      
      {/* Red Header Bar */}
      <View style={styles.headerBar} />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿A quién le quieres transferir dinero?</Text>
      </View>
      
      {/* Add Contact Button */}
      <TouchableOpacity 
        style={styles.addContactButton}
        onPress={() => setShowAddContact(true)}
      >
        <View style={styles.addContactIcon}>
          <Ionicons name="add" size={28} color="white" />
        </View>
        <Text style={styles.addContactText}>Agregar contacto</Text>
      </TouchableOpacity>
      
      {/* Contact List */}
      <ScrollView style={styles.contactList}>
        {contacts.map((contact) => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactItem}
            onPress={() => handleContactSelect(contact)}
          >
            <View style={styles.contactInitial}>
              <Text style={styles.initialText}>{contact.initial}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDetails}>
                {contact.bank} — CLABE {contact.account}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Loading Screen Component with Animation
const LoadingScreen = () => {
  // Animation values
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    // Progress bar animation
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 5000, // 5 seconds to match the loading time
      useNativeDriver: false,
      easing: Easing.linear
    }).start();
    
    // Track progress value
    progressAnimation.addListener(({ value }) => {
      setProgress(value);
    });
    
    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots === "") return ".";
        if (prevDots === ".") return "..";
        if (prevDots === "..") return "...";
        return "";
      });
    }, 500); // Change dots every 500ms
    
    // Cleanup listeners on unmount
    return () => {
      progressAnimation.removeAllListeners();
      clearInterval(dotsInterval);
    };
  }, []);
  
  // Interpolate progress animation to width percentage
  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });
  
  // Create a shimmer effect for the progress bar
  const shimmerOpacity = progressAnimation.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0.5, 1, 0.5, 1, 0.5, 1]
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Transferencia en camino{dots}
        </Text>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressIndicator, 
                { width: progressWidth }
              ]} 
            />
            <Animated.View 
              style={[
                styles.progressShimmer,
                { opacity: shimmerOpacity }
              ]} 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBar: {
    backgroundColor: BANBAJIO_PURPLE,
    height: 5,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  helpButton: {
    padding: 5,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  addContactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BANBAJIO_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addContactText: {
    color: BANBAJIO_RED,
    fontSize: 18,
    fontWeight: '500',
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contactInitial: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  initialText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDetails: {
    color: '#999',
    fontSize: 14,
  },
  // Loading screen styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: BANBAJIO_RED,
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  // Transfer complete screen styles
  successIconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    alignItems: 'center',
    marginBottom: 40,
  },
  recipientName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionDate: {
    color: '#999',
    fontSize: 16,
  },
  transactionInfo: {
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoLabel: {
    color: '#999',
    fontSize: 16,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  statusValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
});

export default TransferScreen; 