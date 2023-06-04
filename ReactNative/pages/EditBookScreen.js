import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import GoBack from '../components/GoBack';
import Circle from '../components/Circle';
import Form_Label from '../components/Form_Label';
import Large_Form from '../components/Large_Form';
import Small_Form from '../components/Small_Form';
import Description_Area from '../components/Description_Area';
import Small_Button from '../components/Small_Button';
import Large_Button from '../components/Large_Button';

const firebaseConfig = {
  apiKey: "AIzaSyB874SwK2FLGOf3PTtDbmAmUEDwCmejqH4",
  authDomain: "bookdiscoveryapp.firebaseapp.com",
  databaseURL: "https://bookdiscoveryapp-default-rtdb.firebaseio.com",
  projectId: "bookdiscoveryapp",
  storageBucket: "bookdiscoveryapp.appspot.com",
  messagingSenderId: "224686141258",
  appId: "1:224686141258:web:4228c07458829be9f25bb3",
  measurementId: "G-0CTY4WGY2C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const allowedGenres = ['fantasy', 'horror', 'mystery', 'adventure', 'romance'];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const EditBookScreen = () => {
  const route = useRoute();
  const { bookId, book } = route.params;
  console.log(bookId, book);

  const [bookTitle, setBookTitle] = useState(book.book_title);
  const [author, setAuthor] = useState(book.book_author);
  const [publishDate, setPublishDate] = useState(book.book_publish || '');
  const [genre, setGenre] = useState(book.book_genre);
  const [description, setDescription] = useState(book.book_description);
  const [message, setMessage] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [bookImage, setBookImage] = useState(book.book_image || null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access media library denied');
      }
    })();
  }, []);

  useEffect(() => {
    setBookTitle(book.book_title);
    setAuthor(book.book_author);
    setPublishDate(book.book_publish || '');
    setGenre(book.book_genre);
    setDescription(book.book_description);
    setBookImage(book.book_image || null);
    setMessage('');
  }, [book]);

  useEffect(() => {
    return () => {
      setMessage(''); 
    };
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const navigation = useNavigation();

  const resetForm = () => {
    setBookTitle('');
    setAuthor('');
    setPublishDate('');
    setGenre('');
    setDescription('');
    setMessage('');
    setBookImage(null);
  };

  const saveBook = async () => {
    let errorMessage = '';

    if (genre.trim() === '') {
      errorMessage = 'Please enter a genre';
    } else if (!allowedGenres.includes(genre.toLowerCase())) {
      errorMessage = 'Please enter a valid genre: Fantasy, Horror, Mystery, Adventure, Romance';
    }

    if (errorMessage !== '') {
      setMessage(errorMessage);
      return;
    }

    if (bookTitle.trim() === '') {
      errorMessage = 'Please enter a book title';
    } else if (author.trim() === '') {
      errorMessage = 'Please enter an author';
    } else if (publishDate.trim() === '') {
      errorMessage = 'Please enter a publish date';
    } else if (genre.trim() === '') {
      errorMessage = 'Please enter a genre';
    } else if (description.trim() === '') {
      errorMessage = 'Please enter a description';
    }

    if (errorMessage !== '') {
      setMessage(errorMessage);
      return;
    }

    const bookData = {
      book_author: author,
      book_description: description,
      book_genre: capitalizeFirstLetter(genre),
      book_publish: publishDate,
      book_title: bookTitle,
      book_image: bookImage,
    };

    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`book_${bookId}`);
      await imageRef.put(blob);

      const imageUrl = await imageRef.getDownloadURL();

      bookData.book_image = imageUrl;
    }

    try {
      await firebase.database().ref(`All_Books/${bookId}`).update(bookData);
      setMessage('Successfully updated the book!');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      setMessage(`Failed to update the book: ${error.message}`);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigation.goBack();
  };

  return (
    <View>
      <GoBack />
      <Circle topPosition={113} leftPosition={-8} />
      <Circle topPosition={285} leftPosition={236} />
      <Circle topPosition={550} leftPosition={-20} />
      <Circle topPosition={749} leftPosition={240} />

      {message !== '' && (
        <View style={styles.messageContainer}>
          <Text
            style={
              message.includes('Successfully')
                ? styles.messageTextSuccess
                : styles.messageTextError
            }
          >
            {message}
          </Text>
        </View>
      )}

      <Form_Label text="Book Title" topPosition={168} leftPosition={92} />
      <Large_Form topPosition={190} onChangeText={(text) => setBookTitle(text)} value={bookTitle} />

      <Form_Label text="Author" topPosition={261} leftPosition={92} />
      <Large_Form topPosition={285} onChangeText={(text) => setAuthor(text)} value={author} />

      <Form_Label text="Publish Date" topPosition={354} leftPosition={92} />
      <Small_Form top={378} left={92} onChangeText={(text) => setPublishDate(text)} value={publishDate} />

      <Form_Label text="Genre" topPosition={354} leftPosition={224} />
      <Small_Form top={378} left={224} onChangeText={(text) => setGenre(text)} value={genre} />

      <Form_Label text="Description" topPosition={444} leftPosition={92} />
      <Description_Area onChangeText={(text) => setDescription(text)} value={description} />

      <Large_Button title="Change Image" topPosition={621} onPress={pickImage} />

      <Small_Button title="Save" topPosition={704} leftPosition={92} onPress={saveBook} />
      <Small_Button title="Cancel" topPosition={704} leftPosition={224} onPress={handleCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    top: 140,
    left: 92,
  },
  messageTextSuccess: {
    fontSize: 16,
    color: 'green',
  },
  messageTextError: {
    fontSize: 16,
    color: 'red',
  },
});

export default EditBookScreen;
