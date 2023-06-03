import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal_Text from './Modal_Text';
import { useNavigation } from '@react-navigation/native';


const ModalComponent = ({ visible, setVisible }) => {
 const navigation = useNavigation();

  const closeModal = () => {
    setVisible(false);
  };

  const handleOverlayPress = () => {
    closeModal();
  };

  const handleModalPress = () => {
    // Do nothing when clicking on the modalView
  };

  const handleHorrorPress = () => {
    navigation.navigate('Horror'); 
    setVisible(false);
  };

  const handleFantasyPress = () => {
    navigation.navigate('Fantasy'); 
    setVisible(false);
  };

  const handleMysteryPress = () => {
    navigation.navigate('Mystery'); 
    setVisible(false);
  };

  const handleAdventurePress = () => {
    navigation.navigate('Adventure'); 
    setVisible(false);
  };

  const handleRomancePress = () => {
    navigation.navigate('Romance'); 
    setVisible(false);
  };

  const handleHighToLowPress = () => {
    navigation.navigate('RatingHtoL'); 
    setVisible(false);
  };

  const handleLowToHighPress = () => {
    navigation.navigate('RatingLtoH'); 
    setVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={handleModalPress}>
              <View>
                <View style={styles.modalView}>
                  <Modal_Text text="Ratings (High to Low)" onPress={handleHighToLowPress}/>
                  <Modal_Text text="Ratings (Low to High)" onPress={handleLowToHighPress}/>
                  <Modal_Text text="Fantasy" onPress={handleFantasyPress} />
                  <Modal_Text text="Horror" onPress={handleHorrorPress} />
                  <Modal_Text text="Mystery" onPress={handleMysteryPress}/>
                  <Modal_Text text="Adventure" onPress={handleAdventurePress}/>
                  <Modal_Text text="Romance" onPress={handleRomancePress}/>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 425,
    width: 348,
  },
});

export default ModalComponent;
