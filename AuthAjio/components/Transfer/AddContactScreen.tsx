import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, TextInput, Modal, ActivityIndicator, Animated } from 'react-native';
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
  securityMethod: 'biometry' | '2fa'; // Security method selected by the user
}

const AddContactScreen: React.FC<AddContactScreenProps> = ({ onBack, onAddContact, securityMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showMethodSelection, setShowMethodSelection] = useState(true);
  const [accountNumber, setAccountNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showBankSelection, setShowBankSelection] = useState(false);
  const [showFaceIDModal, setShowFaceIDModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showVerifyingModal, setShowVerifyingModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const faceIDOpacity = useRef(new Animated.Value(0)).current;
  const faceIDScale = useRef(new Animated.Value(0.5)).current;
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  // Handle biometric authentication
  const handleBiometricAuth = () => {
    setShowFaceIDModal(true);
    
    // Reset animation values
    faceIDOpacity.setValue(0);
    faceIDScale.setValue(0.5);
    
    // Animate Face ID icon appearing
    Animated.parallel([
      Animated.timing(faceIDOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(faceIDScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
    
    // Simulate successful authentication after 2 seconds
    setTimeout(() => {
      // Animate Face ID success
      Animated.parallel([
        Animated.timing(faceIDOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(faceIDScale, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
      
      // Hide Face ID modal and show verifying modal
      setTimeout(() => {
        setShowFaceIDModal(false);
        setShowVerifyingModal(true);
        
        // After 2 seconds, hide verifying modal and add contact
        setTimeout(() => {
          setShowVerifyingModal(false);
          
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
        }, 2000);
      }, 600);
    }, 2000);
  };

  // Handle 2FA authentication
  const handle2FAAuth = () => {
    // Reset authentication state first
    setIsAuthenticating(false);
    setShow2FAModal(true);
    
    // Generate a random 6-digit code but don't display it
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(randomCode);
  };

  // Handle sending verification code
  const handleSendCode = () => {
    // In a real app, this would call an API to send the code
    // No alert, just simulate sending silently
  };

  // Handle verification code submission
  const handleVerifyCode = () => {
    // Show verification in progress
    setIsAuthenticating(true);
    
    // Simulate verification process with a delay
    setTimeout(() => {
      // Hide 2FA modal and show verifying modal
      setIsAuthenticating(false);
      setShow2FAModal(false);
      setShowVerifyingModal(true);
      
      // After 2 seconds, hide verifying modal and add contact
      setTimeout(() => {
        setShowVerifyingModal(false);
        
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
      }, 2000);
    }, 2000); // 2 second delay, similar to Face ID
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedMethod || !accountNumber || !fullName || !selectedBank) {
      // Form validation would go here
      return;
    }

    // Use the appropriate authentication method
    if (securityMethod === 'biometry') {
      handleBiometricAuth();
    } else {
      handle2FAAuth();
    }
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

      {/* Custom Face ID Modal */}
      <Modal
        visible={showFaceIDModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.faceIDModalOverlay}>
          <View style={styles.faceIDModalContent}>
            <Text style={styles.faceIDTitle}>Face ID</Text>
            <Text style={styles.faceIDSubtitle}>
              Confirma la adición de contacto
            </Text>
            
            <Animated.View 
              style={[
                styles.faceIDIconContainer,
                {
                  opacity: faceIDOpacity,
                  transform: [{ scale: faceIDScale }]
                }
              ]}
            >
              <Ionicons name="scan-outline" size={80} color="white" />
            </Animated.View>
            
            <Text style={styles.faceIDInstructions}>
              Mirando a la pantalla
            </Text>
          </View>
        </View>
      </Modal>

      {/* Verifying Contact Modal */}
      <Modal
        visible={showVerifyingModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.verifyingModalOverlay}>
          <View style={styles.verifyingModalContent}>
            <ActivityIndicator size="large" color={BANBAJIO_RED} style={styles.verifyingSpinner} />
            <Text style={styles.verifyingTitle}>Verificando contacto</Text>
            <Text style={styles.verifyingSubtitle}>
              Validando información bancaria...
            </Text>
          </View>
        </View>
      </Modal>

      {/* Add the 2FA Modal */}
      <Modal
        visible={show2FAModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verificación de dos factores</Text>
            <Text style={styles.modalSubtitle}>
              Para agregar este contacto, necesitamos verificar tu identidad
            </Text>
            
            <TouchableOpacity 
              style={styles.sendCodeButton} 
              onPress={handleSendCode}
              disabled={isAuthenticating}
            >
              <Text style={styles.sendCodeButtonText}>Enviar código</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.codeInput}
              placeholder="Ingresa el código"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              selectionColor={BANBAJIO_RED}
              editable={!isAuthenticating}
            />
            
            <TouchableOpacity 
              style={[styles.verifyButton, isAuthenticating && styles.disabledButton]} 
              onPress={handleVerifyCode}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="white" style={styles.loadingIndicator} />
                  <Text style={styles.verifyButtonText}>Verificando...</Text>
                </View>
              ) : (
                <Text style={styles.verifyButtonText}>Verificar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#555',
  },
  inputHelperText: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '400',
  },
  faceIDModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceIDModalContent: {
    width: '80%',
    alignItems: 'center',
    padding: 30,
  },
  faceIDTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faceIDSubtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  faceIDIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  faceIDInstructions: {
    color: '#999',
    fontSize: 16,
  },
  verifyingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyingModalContent: {
    width: '80%',
    alignItems: 'center',
    padding: 30,
  },
  verifyingSpinner: {
    marginBottom: 20,
  },
  verifyingTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verifyingSubtitle: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#CCC',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    color: 'white',
    fontSize: 18,
    padding: 15,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 5,
  },
  verifyButton: {
    backgroundColor: BANBAJIO_RED,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendCodeButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendCodeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginRight: 10,
  },
});

export default AddContactScreen; 