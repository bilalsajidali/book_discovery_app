import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoBack from '../components/GoBack';
import Circle from '../components/Circle';
import Form_Label from '../components/Form_Label';
import Large_Form from '../components/Large_Form';
import Small_Form from '../components/Small_Form';
import Description_Area from '../components/Description_Area';
import UploadImageButton from '../components/Upload_Image_Button';
import Small_Button from '../components/Small_Button';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

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

const allowedGenres = ['Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance'];

const CreateScreen = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setBookTitle('');
    setAuthor('');
    setPublishDate('');
    setGenre('');
    setDescription('');
    setImageUri(null);
    setImageUrl(null);
    setMessage('');
  };

  const saveBook = () => {
    const bookRef = firebase.database().ref('All_Books').push();
    // Check if any form field or the image upload is empty
    if (
      bookTitle.trim() === '' ||
      author.trim() === '' ||
      publishDate.trim() === '' ||
      genre.trim() === '' ||
      description.trim() === '' ||
      imageUri === null
    ) {
      setMessage('Please fill in all fields and upload an image');
      return;
    }

    // Check if the entered genre is one of the allowed options
    if (!allowedGenres.includes(genre)) {
      setMessage('Please enter a valid genre: Fantasy, Horror, Mystery, Adventure, Romance');
      return;
    }

    const user = firebase.auth().currentUser;
    if (!user) {
      console.log('No user is logged in');
      setMessage('No user is logged in');
      return;
    }

    const bookData = {
      book_title: bookTitle,
      book_author: author,
      book_publish: '',
      book_genre: genre,
      book_description: description,
      book_rating: 0.0,
      book_image: imageUrl,
    };

    const addedBooksRef = firebase.database().ref('Added_Books/' + user.uid);
    addedBooksRef
      .update({
        [bookRef.key]: true,
      })
      .then(() => {
        console.log('Book added to Added_Books for user');
      })
      .catch(error => {
        console.log('Error adding book to Added_Books for user:', error);
        setMessage('Error adding book to Added_Books for user');
      });

    // Validate the publishDate input
    if (/^\d{4}$/.test(publishDate)) {
      bookData.book_publish = publishDate;

      if (imageUri) {
        const imageName = `book_${bookRef.key}`;
        const storageRef = firebase.storage().ref().child(imageName);
        const imageUploadTask = storageRef.put(imageUri);

        imageUploadTask
          .then(() => {
            console.log('Image uploaded successfully');
            return storageRef.getDownloadURL();
          })
          .then(downloadURL => {
            console.log('Download URL:', downloadURL);
            setImageUrl(downloadURL);
            bookData.book_image = downloadURL;
            return bookRef.set(bookData);
          })
          .then(() => {
            console.log('Book and image added successfully');
            setMessage('Successfully Added Book');
            resetForm();
          })
          .catch(error => {
            console.log('Error adding book and image:', error);
            setMessage('Error adding book and image');
          });
      } else {
        bookRef
          .set(bookData)
          .then(() => {
            console.log('Book added successfully');
            setMessage('Successfully Added Book');
            resetForm();
          })
          .catch(error => {
            console.log('Error adding book:', error);
            setMessage('Error adding book');
          });
      }
    } else {
      console.log('Invalid publish date');
      setMessage('Invalid publish date');
    }
  };

  const handleImageSelection = uri => {
    setImageUri(uri);
    setImageUrl(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <View>
      <GoBack />
      <Circle topPosition={113} leftPosition={-8}></Circle>
      <Circle topPosition={285} leftPosition={236}></Circle>
      <Circle topPosition={550} leftPosition={-20}></Circle>
      <Circle topPosition={749} leftPosition={240}></Circle>

      {/* Display message container */}
      {message !== '' && (
        <View style={styles.messageContainer}>
          <Text style={message.includes('Successfully') ? styles.messageTextSuccess : styles.messageTextError}>
            {message}
          </Text>
        </View>
      )}

      <Form_Label text="Book Title" topPosition={168} leftPosition={92} />
      <Large_Form
        topPosition={190}
        onChangeText={text => setBookTitle(text)}
        value={bookTitle}
      />

      <Form_Label text="Author" topPosition={261} leftPosition={92} />
      <Large_Form topPosition={285} onChangeText={text => setAuthor(text)} value={author} />

      <Form_Label text="Publish Date" topPosition={354} leftPosition={92} />
      <Small_Form
        top={378}
        left={92}
        onChangeText={text => setPublishDate(text)}
        value={publishDate}
      />

      <Form_Label text="Genre" topPosition={354} leftPosition={224} />
      <Small_Form top={378} left={224} onChangeText={text => setGenre(text)} value={genre} />

      <Form_Label text="Description" topPosition={444} leftPosition={92} />
      <Description_Area
        onChangeText={text => setDescription(text)}
        value={description}
      />

      <UploadImageButton onSelect={handleImageSelection} />

      <Small_Button title="Save" topPosition={704} leftPosition={92} onPress={saveBook} />
      <Small_Button
        title="Cancel"
        topPosition={704}
        leftPosition={224}
        onPress={handleCancel}
      />
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

export default CreateScreen;
