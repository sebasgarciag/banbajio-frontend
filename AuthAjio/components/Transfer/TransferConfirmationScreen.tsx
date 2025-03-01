import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BANBAJIO_PURPLE, BANBAJIO_RED } from '../../constants/colors';

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
}

const TransferConfirmationScreen: React.FC<TransferConfirmationScreenProps> = ({
  onBack,
  onConfirm,
  amount,
  contact
}) => {
  // State for concept editing
  const [concept, setConcept] = useState('Transferencia');
  const [showConceptModal, setShowConceptModal] = useState(false);
  const [tempConcept, setTempConcept] = useState('');
  
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BANBAJIO_PURPLE} barStyle="light-content" />
      
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
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Transferir</Text>
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
    color: BANBAJIO_PURPLE,
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
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
  }
});

export default TransferConfirmationScreen; 