import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
  Easing
} from 'react-native';

const simulateSensorData = () => {
  const voltage = Math.random() * 0;
  const isOccupied = Math.random() > 0.5;

  return {
    encendido: voltage > 50 ? '🔴' : '🔴',
    ocupado: isOccupied ? 'Vacío' : 'Vacío',
    voltaje: voltage.toFixed(2)
  };
};

const Inicio2 = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const fadeAnim = useState(new Animated.Value(0))[0];

  const initialUnits = [
    {id: '6', unit: 'C6', planta: 'Planta Alta'},
    { id: '7', unit: 'C7', planta: 'Planta Alta' },
    { id: '8', unit: 'C8', planta: 'Planta Alta' },
    { id: '9', unit: 'C9', planta: 'Planta Alta' },
    { id: '10', unit: 'C10', planta: 'Planta Alta' },
    { id: '11', unit: 'C11', planta: 'Planta Alta' },
    { id: '12', unit: 'C12', planta: 'Planta Alta' },
    { id: '13', unit: 'C13', planta: 'Planta Alta' },
    { id: '14', unit: 'C14', planta: 'Planta Alta' },
    { id: 'lab', unit: 'Laboratorio', planta: 'Planta Alta'},
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();

    const interval = setInterval(() => {
      const updatedData = initialUnits.map((item) => {
        if (item.separator) return item;
        return { ...item, ...simulateSensorData() };
      });
      setData(updatedData);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const openCommentModal = (unit) => {
    setSelectedUnit(unit);
    setComment(comments[unit] || '');
    setModalVisible(true);
  };

  const handleCommentSubmit = () => {
    setComments((prev) => ({
      ...prev,
      [selectedUnit]: comment.trim(),
    }));
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    if (item.separator) {
      return (
        <View style={styles.separatorContainer}>
          <Text style={styles.separatorText}>{item.separator}</Text>
        </View>
      );
    }

    const hasAlert = item.encendido === '🟢' && item.ocupado === 'Vacío';
    
    return (
      <Animated.View 
        style={[
          styles.tableRow, 
          hasAlert && styles.alertRow,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={[styles.cell, styles.unitCell]}>{item.unit}</Text>
        <View style={styles.statusCell}>
          <Text style={[
            styles.statusText,
            item.encendido === '🟢' ? styles.onText : styles.offText
          ]}>
            {item.encendido}
          </Text>
          <Text style={styles.voltageText}>{item.voltaje}V</Text>
        </View>
        <Text style={[
          styles.cell, 
          item.ocupado === 'Ocupado' ? styles.occupiedText : styles.vacantText
        ]}>
          {item.ocupado}
        </Text>

        <TouchableOpacity
          style={[
            styles.commentButton,
            comments[item.unit] ? styles.commentActive : styles.commentInactive,
          ]}
          onPress={() => openCommentModal(item.unit)}
        >
          <Text style={styles.commentButtonText}>
            {comments[item.unit] ? '✏️' : '💬'}
          </Text>
        </TouchableOpacity>

        <View style={styles.alertCell}>
          {hasAlert && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertText}>⚠️</Text>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Monitoreo de Aire Acondicionado</Text>

      <Text style={styles.title}>Planta Alta</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.columnSalon]}>Salón</Text>
        <Text style={[styles.headerCell, styles.columnEstado]}>Estado Aire</Text>
        <Text style={[styles.headerCell, styles.columnEstado]}>Estado Salón</Text>
        <Text style={[styles.headerCell, styles.columnComentarios]}>Comentarios</Text>
        <Text style={[styles.headerCell, styles.columnAlerta]}>Alerta</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comentario para {selectedUnit}</Text>
            <TextInput
              placeholder="Escribe tu comentario..."
              style={styles.modalInput}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleCommentSubmit}
              >
                <Text style={styles.modalBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f7951d',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  columnSalon: {
    flex: 0.8,
  },
  columnEstado: {
    flex: 1,
  },
  columnComentarios: {
    flex: 1.2,
  },
  columnAlerta: {
    flex: 0.8,
  },
  listContent: {
    paddingBottom: 20,
  },
  separatorContainer: {
    backgroundColor: '#e9ecef',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  separatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  alertRow: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  cell: {
    textAlign: 'center',
  },
  unitCell: {
    fontWeight: '600',
    color: '#212529',
    flex: 0.8,
  },
  statusCell: {
    flex: 1,
    alignItems: 'center',
  },
  statusText: {
    fontWeight: 'bold',
  },
  voltageText: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 2,
  },
  onText: {
    color: '#28a745',
  },
  offText: {
    color: '#6c757d',
  },
  occupiedText: {
    color: '#007bff',
    fontWeight: 'bold',
    flex: 1,
  },
  vacantText: {
    color: '#6c757d',
    flex: 1,
  },
  commentButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2,
    marginHorizontal: 5,
  },
  commentActive: {
    backgroundColor: '#ac6767aa',
  },
  commentInactive: {
    backgroundColor: '#6fac67aa',
  },
  commentButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  alertCell: {
    flex: 0.8,
    alignItems: 'center',
  },
  alertBadge: {
    backgroundColor: '#fff3cd',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  alertText: {
    color: '#856404',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 100,
    backgroundColor: '#f8f9fa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    backgroundColor: '#28a745',
  },
  cancelBtn: {
    backgroundColor: '#6c757d',
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Inicio2;