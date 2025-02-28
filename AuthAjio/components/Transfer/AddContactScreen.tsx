import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANBAJIO_RED = '#FF6B6B'; // Using the friendly coral-red shade

// Transfer method types
const TRANSFER_METHODS = [
  { id: 'clabe', label: 'A una cuenta con CLABE', digits: 18, placeholder: 'Debe ser un número de 18 dígitos' },
  { id: 'debit', label: 'A una tarjeta de débito', digits: 16, placeholder: 'Debe ser un número de 16 dígitos' }
];

// Bank entities for dropdown
const BANK_ENTITIES = [
  { id: 'banbajio', name: 'BANBAJÍO' },
  { id: 'santander', name: 'SANTANDER' },
  { id: 'banorte', name: 'BANORTE' },
  { id: 'hsbc', name: 'HSBC' },
  { id: 'scotiabank', name: 'SCOTIABANK' },
  { id: 'inbursa', name: 'INBURSA' },
  { id: 'citibanamex', name: 'CITIBANAMEX' },
  { id: 'bbva', name: 'BBVA MEXICO' },
  { id: 'stp', name: 'STP' }
];

interface AddContactScreenProps {
  onBack: () => void; // Function to navigate back to TransferScreen
  onAddContact: (contact: any) => void; // Function to add a new contact
}

const AddContactScreen: React.FC<AddContactScreenProps> = ({ onBack, onAddContact }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showMethodSelection, setShowMethodSelection] = useState(true);
  const [accountNumber, setAccountNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showBankSelection, setShowBankSelection] = useState(false);

  // Handle method selection
  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowMethodSelection(false);
  };

  // Handle bank selection
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setShowBankSelection(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedMethod || !accountNumber || !fullName || !selectedBank) {
      // Form validation would go here
      return;
    }

    // Create new contact object
    const newContact = {
      id: Date.now().toString(),
      initial: fullName.charAt(0).toUpperCase(),
      name: fullName,
      bank: BANK_ENTITIES.find(bank => bank.id === selectedBank)?.name || '',
      account: '••••' + accountNumber.slice(-4),
    };

    // Add contact and go back
    onAddContact(newContact);
    onBack();
  };

  // Render method selection screen
  if (showMethodSelection) {
    return (
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
          <Text style={styles.title}>¿Cómo quieres transferir el dinero?</Text>
        </View>
        
        {/* Transfer Method Selection */}
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Tipo de transferencia</Text>
          
          {TRANSFER_METHODS.map((method) => (
            <TouchableOpacity 
              key={method.id} 
              style={styles.methodOption}
              onPress={() => handleMethodSelect(method.id)}
            >
              <Text style={styles.methodOptionText}>{method.label}</Text>
              <Ionicons name="chevron-down" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // Render bank selection if active
  if (showBankSelection) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={BANBAJIO_RED} barStyle="light-content" />
        
        {/* Red Header Bar */}
        <View style={styles.headerBar} />
        
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowBankSelection(false)} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecciona una entidad</Text>
        </View>
        
        {/* Bank Selection List */}
        <ScrollView style={styles.bankList}>
          {BANK_ENTITIES.map((bank) => (
            <TouchableOpacity 
              key={bank.id} 
              style={styles.bankOption}
              onPress={() => handleBankSelect(bank.id)}
            >
              <Text style={styles.bankOptionText}>{bank.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Render contact details form
  const selectedMethodDetails = TRANSFER_METHODS.find(method => method.id === selectedMethod);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BANBAJIO_RED} barStyle="light-content" />
      
      {/* Red Header Bar */}
      <View style={styles.headerBar} />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowMethodSelection(true)} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Cómo quieres transferir el dinero?</Text>
      </View>
      
      {/* Contact Form */}
      <ScrollView style={styles.formScrollView}>
        <View style={styles.formContainer}>
          {/* Transfer Method (Selected) */}
          <Text style={styles.formLabel}>Tipo de transferencia</Text>
          <TouchableOpacity 
            style={styles.methodOption}
            onPress={() => setShowMethodSelection(true)}
          >
            <Text style={styles.methodOptionText}>
              {selectedMethodDetails?.label || 'Selecciona un método'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          
          {/* Account Number Input */}
          <Text style={styles.formLabel}>{selectedMethodDetails?.placeholder}</Text>
          <TextInput
            style={styles.textInput}
            placeholder=""
            placeholderTextColor="#666"
            keyboardType="numeric"
            maxLength={selectedMethodDetails?.digits}
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          <Text style={styles.inputHelperText}>
            {selectedMethodDetails?.placeholder}
          </Text>
          
          {/* Bank Selection */}
          <Text style={styles.formLabel}>Entidad</Text>
          <TouchableOpacity 
            style={styles.methodOption}
            onPress={() => setShowBankSelection(true)}
          >
            <Text style={styles.methodOptionText}>
              {selectedBank ? 
                BANK_ENTITIES.find(bank => bank.id === selectedBank)?.name : 
                'Elige una entidad'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          
          {/* Full Name Input */}
          <Text style={styles.formLabel}>Nombre completo</Text>
          <TextInput
            style={styles.textInput}
            placeholder=""
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            (!accountNumber || !fullName || !selectedBank) ? styles.disabledButton : {}
          ]}
          onPress={handleSubmit}
          disabled={!accountNumber || !fullName || !selectedBank}
        >
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
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
  formScrollView: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formLabel: {
    color: '#999',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '400',
  },
  methodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 15,
  },
  methodOptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 15,
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  bankList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bankOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  bankOptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'flex-end',
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
  },
  inputHelperText: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '400',
  }
});

export default AddContactScreen; 