import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, TextInput, Modal, Alert, Image, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

const BANBAJIO_RED = '#FF6B6B'; // Using the friendly coral-red shade

interface TransferConfirmationScreenProps {
  onBack: () => void; // Function to navigate back to amount screen
  onConfirm: () => void; // Function to confirm the transfer
  amount: number; // Amount to transfer
  contact: {
    id: string;
    name: string;
    bank: string;
    account: string;
  };
  securityMethod: 'biometry' | '2fa'; // Security method selected by the user
}

const TransferConfirmationScreen: React.FC<TransferConfirmationScreenProps> = ({
  onBack,
  onConfirm,
  amount,
  contact,
  securityMethod
}) => {
  // State for concept editing
  const [concept, setConcept] = useState('Transferencia');
  const [showConceptModal, setShowConceptModal] = useState(false);
  const [tempConcept, setTempConcept] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showFaceIDModal, setShowFaceIDModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const faceIDOpacity = useRef(new Animated.Value(0)).current;
  const faceIDScale = useRef(new Animated.Value(0.5)).current;
  
  // Generate a random reference number (6 digits)
  const referenceNumber = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Format the amount with commas for thousands
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Get last 4 digits of account
  const lastFourDigits = contact.account.replace(/[^\d]/g, '').slice(-4);

  // Handle opening the concept edit modal
  const handleEditConcept = () => {
    setTempConcept(concept);
    setShowConceptModal(true);
  };

  // Handle saving the edited concept
  const handleSaveConcept = () => {
    if (tempConcept.trim()) {
      setConcept(tempConcept);
    }
    setShowConceptModal(false);
  };

  // Handle authentication with Face ID
  const handleBiometricAuth = () => {
    setIsAuthenticating(true);
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
      
      // Hide modal and proceed with transfer
      setTimeout(() => {
        setShowFaceIDModal(false);
        setIsAuthenticating(false);
        onConfirm();
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
      // Complete verification and proceed
      setIsAuthenticating(false);
      setShow2FAModal(false);
      onConfirm();
    }, 2000); // 2 second delay, similar to Face ID
  };

  // Handle authentication based on selected method
  const handleAuthenticate = () => {
    if (securityMethod === 'biometry') {
      handleBiometricAuth();
    } else {
      handle2FAAuth();
    }
  };

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
        <Text style={styles.title}>
          Vas a transferir <Text style={styles.highlightText}>${formattedAmount}</Text> a{'\n'}
          <Text style={styles.highlightText}>{contact.name}</Text>
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Monto</Text>
          <Text style={styles.sectionValue}>${formattedAmount}</Text>
        </View>
        
        {/* Concept Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Concepto</Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionValue}>{concept}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditConcept}>
              <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Reference Number Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Número de referencia</Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionValue}>{referenceNumber}</Text>
          </View>
        </View>
        
        {/* Transfer Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Datos de transferencia</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>CLABE</Text>
            <Text style={styles.detailValue}>••••{lastFourDigits}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo de transferencia</Text>
            <Text style={styles.detailValue}>SPEI</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Entidad destino</Text>
            <Text style={styles.detailValue}>{contact.bank}</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleAuthenticate}
          disabled={isAuthenticating}
        >
          <Text style={styles.confirmButtonText}>
            {isAuthenticating ? "Autenticando..." : 
              securityMethod === 'biometry' ? "Confirmar con Face ID" : "Confirmar con código"}
          </Text>
          {!isAuthenticating && (
            <Ionicons 
              name={securityMethod === 'biometry' ? "scan-outline" : "key-outline"}
              size={24} 
              color="white" 
              style={styles.biometricIcon} 
            />
          )}
        </TouchableOpacity>
        <Text style={styles.freeTransferText}>Esta transferencia es gratuita.</Text>
      </View>

      {/* Concept Edit Modal */}
      <Modal
        visible={showConceptModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar concepto</Text>
            
            <TextInput
              style={styles.conceptInput}
              value={tempConcept}
              onChangeText={setTempConcept}
              placeholder="Ingresa el concepto"
              placeholderTextColor="#999"
              maxLength={40}
              autoFocus
              selectionColor={BANBAJIO_RED}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowConceptModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSaveConcept}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
              Autenticando con reconocimiento facial
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
          </View>
        </View>
      </Modal>

      {/* 2FA Verification Modal */}
      <Modal
        visible={show2FAModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verificación de dos factores</Text>
            <Text style={styles.modalSubtitle}>
              Para confirmar esta operación, necesitamos verificar tu identidad
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
    paddingBottom: 20,
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 38,
  },
  highlightText: {
    color: BANBAJIO_RED,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    color: '#999',
    fontSize: 16,
    marginBottom: 5,
  },
  sectionValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
  },
  detailsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  detailsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    color: '#999',
    fontSize: 16,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: BANBAJIO_RED,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  biometricIcon: {
    marginLeft: 8,
  },
  freeTransferText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  conceptInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  saveButton: {
    backgroundColor: BANBAJIO_RED,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  // Face ID Modal styles
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
  codeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  verificationCode: {
    color: BANBAJIO_RED,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  codeHelperText: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
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
  modalSubtitle: {
    color: '#CCC',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
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
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginRight: 10,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
});

export default TransferConfirmationScreen; 