import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANBAJIO_RED = '#FF6B6B'; // Using the friendly coral-red shade

interface TransferAmountScreenProps {
  onBack: () => void; // Function to navigate back to contact selection
  contact: {
    id: string;
    name: string;
    bank: string;
    account: string;
  };
  availableBalance: number; // Available balance for transfer
  onContinue: (amount: number) => void; // Function to proceed with the transfer
}

const TransferAmountScreen: React.FC<TransferAmountScreenProps> = ({ 
  onBack, 
  contact, 
  availableBalance,
  onContinue 
}) => {
  // Simple string input for amount (integers only)
  const [inputAmount, setInputAmount] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Handle amount input change - integers only
  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters
    const numericOnly = text.replace(/[^0-9]/g, '');
    setInputAmount(numericOnly);
    
    // Clear error when input is empty
    if (numericOnly === '') {
      setErrorMessage('');
      return;
    }
    
    // Validate the amount
    const amount = parseInt(numericOnly, 10);
    if (amount <= 0) {
      setErrorMessage('El monto debe ser mayor a cero');
    } else if (amount > availableBalance) {
      setErrorMessage('No tienes suficiente saldo para esta transferencia');
    } else {
      setErrorMessage('');
    }
  };

  // Check if the amount is valid for continuing
  const isAmountValid = inputAmount !== '' && 
                        parseInt(inputAmount, 10) > 0 && 
                        parseInt(inputAmount, 10) <= availableBalance;

  // Format the display value for the input
  const getDisplayValue = () => {
    if (inputAmount === '') {
      return '';
    }
    return `$${inputAmount}`;
  };

  // Format the available balance with commas for thousands (no decimals)
  const formattedBalance = Math.floor(availableBalance).toLocaleString('en-US');

  // Handle continue button press
  const handleContinue = () => {
    if (isAmountValid) {
      onContinue(parseInt(inputAmount, 10));
    }
  };

  // Dismiss keyboard when touching outside the input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={BANBAJIO_RED} barStyle="light-content" />
        
        {/* Red Header Bar */}
        <View style={styles.headerBar} />
        
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>¿Cuánto vas a transferir?</Text>
          <Text style={styles.balanceText}>Saldo disponible ${formattedBalance}</Text>
          <Text style={styles.recipientText}>Para: {contact.name}</Text>
        </View>
        
        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={inputAmount}
              onChangeText={handleAmountChange}
              keyboardType="number-pad"
              autoFocus={true}
              placeholder="Ingresa el monto"
              placeholderTextColor="#555"
            />
          </View>
          <View style={styles.amountUnderline} />
        </View>
        
        {/* Error Message */}
        {errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        
        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              !isAmountValid ? styles.disabledButton : {}
            ]}
            onPress={handleContinue}
            disabled={!isAmountValid}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBar: {
    backgroundColor: BANBAJIO_RED,
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
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: 0.3,
  },
  balanceText: {
    color: '#999',
    fontSize: 18,
    marginTop: 10,
  },
  recipientText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  amountContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: 'white',
    fontSize: 48,
    fontWeight: '500',
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    color: 'white',
    fontSize: 48,
    fontWeight: '500',
    paddingVertical: 10,
  },
  amountUnderline: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 16,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  continueButton: {
    backgroundColor: BANBAJIO_RED,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BANBAJIO_RED,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#666',
  }
});

export default TransferAmountScreen; 