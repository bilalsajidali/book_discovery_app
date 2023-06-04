import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Share, 
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import GoBack from '../components/GoBack';
import GoogleAds from '../components/ads';
import BookBanner from '../components/Book_Banner';
import Book_Heading from '../components/Book_Heading';
import SubHeading from '../components/SubHeading';
import Normal_Text from '../components/Normal_Text';
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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
}

const DetailScreen = ({ route }) => {
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false); // New state to track bookmark status
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleRatingChange = (newRating) => {
    const bookId = route.params.bookId;
    firebase
      .database()
      .ref(`All_Books/${bookId}/book_rating`)
      .set(newRating)
      .then(() => {
        setRating(newRating);
      })
      .catch((error) => {
        console.error('Error updating rating:', error);
      });
  };

  const handleShare = () => {
    Share.share({
      message: `Check out this book: ${book.book_title} by ${book.book_author}`,
    })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  };

  const handleBookmark = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const bookId = route.params.bookId;

      const bookmarkRef = firebase.database().ref(`Saved_Books/${userId}/${bookId}`);
      bookmarkRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
          bookmarkRef.remove()
            .then(() => {
              setIsBookmarked(false);
              console.log('Bookmark removed successfully');
            })
            .catch((error) => {
              console.error('Error removing bookmark:', error);
            });
        } else {
          bookmarkRef.set(true)
            .then(() => {
              setIsBookmarked(true);
              console.log('Bookmark added successfully');
            })
            .catch((error) => {
              console.error('Error adding bookmark:', error);
            });
        }
      }).catch((error) => {
        console.error('Error checking bookmark:', error);
      });
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookId = route.params.bookId;
        const bookRef = firebase.database().ref(`All_Books/${bookId}`);
        const snapshot = await bookRef.once('value');
        const bookData = { bookId, ...snapshot.val() };
        setBook(bookData);
        setRating(bookData.book_rating);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [route.params.bookId]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const bookId = route.params.bookId;

      firebase
        .database()
        .ref(`Saved_Books/${userId}/${bookId}`)
        .once('value')
        .then((snapshot) => {
          const isBookmarked = snapshot.val();
          setIsBookmarked(!!isBookmarked); // Convert to boolean
        })
        .catch((error) => {
          console.error('Error checking bookmark:', error);
        });
    }
  }, [route.params.bookId]);

  if (!book) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <GoBack />

        <BookBanner bookId={book.bookId} />

        <Book_Heading color="#000000" topPosition={361} leftMargin={43}>
          {book.book_title}
        </Book_Heading>

        <SubHeading text="Author:" topPosition={419} leftPosition={43} color="#000000" isAbsolutePosition={true}/>
        <Normal_Text text={book.book_author} topPosition={419} leftPosition={130} absolutePosition={true} />

        <SubHeading text="Publish:" topPosition={461} leftPosition={43} color="#000000" isAbsolutePosition={true}/>
        <Normal_Text text={book.book_publish} topPosition={461} leftPosition={135} absolutePosition={true} />

        <SubHeading text="Genre:" topPosition={499} leftPosition={43} color="#000000" isAbsolutePosition={true}/>
        <Normal_Text text={book.book_genre} topPosition={499} leftPosition={120} absolutePosition={true} />

        <SubHeading text="Rating:" topPosition={536} leftPosition={43} color="#000000" isAbsolutePosition={true}/>
        <Normal_Text text={book && book.book_rating ? book.book_rating.toString() : ''} topPosition={536} leftPosition={127} absolutePosition={true} />

        <View style={styles.descriptionAndRatingContainer}>
          <Normal_Text style={styles.descriptionText} text={book.book_description} />

          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={rating}
            size={45}
            onFinishRating={handleRatingChange}
            selectedColor="#000000"
            showRating={false}
          />

          <View style={styles.iconContainer}>
            <FontAwesome5 name="share-alt" size={50} color="#000000" onPress={handleShare} />

            <Text style={styles.iconSpacing} /> {/* Add an empty Text component for spacing */}

            <TouchableOpacity onPress={handleBookmark}>
              <FontAwesome5
                name="bookmark"
                size={50}
                color={isBookmarked ? '#000000' : '#a9a9a9'} // Use solid color if bookmarked, otherwise use regular color
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.adsContainer}>
        <GoogleAds />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 64, // Height of the GoogleAds component
  },
  adsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionAndRatingContainer: {
    marginTop: 575,
    marginBottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    marginBottom: 28,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconSpacing: {
    width: 145,
  },
});

export default DetailScreen;
