import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Nosotros = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideUpAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const teamMembers = [
    { id: 1, name: 'Avalos Tinoco Jordán Jonathan', role: 'Desarrollador App Movil, BD y IoT', image: require('../../assets/file4.png') },
    { id: 2, name: 'Alemán Avalos Cristhian Oswaldo', role: 'Desarrollador App Movil, BD y IoT', image: require('../../assets/file2.png') },
    { id: 3, name: 'Reyes Reyes Jorge Antonio', role: 'Desarrollador Frontend y Backend', image: require('../../assets/file.png') },
    { id: 4, name: 'Hernández Silva Ángel Javier', role: 'Desarrollador Frontend y Backend', image: require('../../assets/file3.png') },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.header,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }] 
            }
          ]}
        >
          <Image 
            source={require('../../assets/logoe.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.companyTitle}>SoftNova</Text>
          <Text style={styles.companySubtitle}>Un Sistema, Mill Soluciones </Text>
          <Text style={styles.companySubtitle}>Innovación en control climático</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.card,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }] 
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="business" size={24} color="#f7951d" />
            <Text style={styles.sectionTitle}>Nuestra Empresa</Text>
          </View>
          <Text style={styles.description}>
            Promovemos una gestión eficiente de recursos, mejorando el confort térmico en aulas y contribuyendo a la sostenibilidad ambiental mediante sistemas automatizados de climatización inteligente.
          </Text>

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
            <Ionicons name="navigate" size={24} color="#f7951d" />
            <Text style={styles.sectionTitle}>Misión</Text>
          </View>
          <Text style={styles.description}>
            Desarrollamos sistemas inteligentes de monitoreo y gestión para entornos educativos, proporcionando herramientas eficaces para optimizar el consumo energético y mejorar el ambiente de aprendizaje.
          </Text>

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
            <Ionicons name="eye" size={24} color="#f7951d" />
            <Text style={styles.sectionTitle}>Visión</Text>
          </View>
          <Text style={styles.description}>
            Liderar la innovación en soluciones tecnológicas para gestión energética en instituciones educativas, creando ambientes más saludables y sostenibles mientras reducimos el consumo eléctrico y prolongamos la vida útil de los equipos.
          </Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.card, 
            styles.teamCard,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }] 
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={24} color="#f7951d" />
            <Text style={styles.sectionTitle}>Nuestro Equipo</Text>
          </View>
          
          {teamMembers.map((member, index) => (
            <Animated.View 
              key={member.id}
              style={[
                styles.memberContainer,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }] 
                }
              ]}
            >
              <Image 
                source={member.image} 
                style={styles.memberImage} 
                resizeMode="cover"
              />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 25,
    paddingTop: 70,
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: '#f7951d',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 180,
    height: 90,
    marginBottom: 15,
  },
  companyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  companySubtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  teamCard: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f7951d',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    textAlign: 'justify',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 20,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#f7951d',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  memberRole: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
});

export default Nosotros;