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
