import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MovieSelectionPage = ({ movies, onSelectMovie }) => (
  <View style={[styles.container,{ backgroundColor: '#6C0345' }]}>
    <Text style={[styles.heading, { color: '#fff' ,fontWeight: 'bold' }]}>Select a Movie</Text>
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movieItem}
          onPress={() => onSelectMovie(item)}
        >
          <Text style={styles.movieText}>
            {item.name} - ₹{item.price} 
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);

const SeatSelectionPage = ({ selectedMovie, onSeatSelection, selectedSeats, onBookTickets }) => (
  <View style={[styles.container,{ backgroundColor: '#6C0345' }]}>
    <Text style={[styles.heading,{ color: '#fff' ,fontWeight: 'bold' }]}>Select Seats for {selectedMovie.name}</Text>
    <FlatList
      data={[...Array(30).keys()]}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.seatItem, selectedSeats.includes(item + 1) && styles.selectedSeat]}
          onPress={() => onSeatSelection(item + 1)}
        >
          <Text style={styles.seatText}>{item + 1}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.toString()}
      numColumns={5}
      contentContainerStyle={styles.seatContainer}
    />
    <Button title="Book Tickets" onPress={onBookTickets} disabled={selectedSeats.length === 0} />
  </View>
);

const PaymentPage = ({ totalPrice, onConfirmPayment }) => (
  <View style={[styles.container,{ backgroundColor: '#6C0345' }]}>
    <Text style={[styles.heading,{ color: '#fff' ,fontWeight: 'bold' }]}>Payment Details</Text>
    <Text style={{ color: '#fff' }}>Total Price: ₹{totalPrice}</Text>
    <Button title="Pay Now" onPress={onConfirmPayment} />
  </View>
);

const SuccessPage = () => (
  <View style={[styles.container, { backgroundColor: '#d4edda' }]}>
    <Text style={[styles.heading, { color: '#155724' }]}>Tickets booked successfully!</Text>
  </View>
);

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [seatSelectionEnabled, setSeatSelectionEnabled] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setSeatSelectionEnabled(true);
  };

  const handleSeatSelection = (seat) => {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
    }
  };

  const handleBookTickets = () => {
    setShowPaymentPage(true);
  };

  const handleConfirmPayment = () => {
    // Implement payment confirmation logic here
    setShowSuccessPage(true);
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * selectedMovie.price;
  };

  return (
    <View style={styles.container}>
      {!selectedMovie && (
        <MovieSelectionPage
          movies={[
            { id: 1, name: 'Avatar', price: 250 },
            { id: 2, name: 'Inception', price: 200 },
            { id: 3, name: 'Interstellar', price: 300 },
          ]}
          onSelectMovie={handleMovieSelection}
        />
      )}
      {selectedMovie && seatSelectionEnabled && !showPaymentPage && (
        <SeatSelectionPage
          selectedMovie={selectedMovie}
          onSeatSelection={handleSeatSelection}
          selectedSeats={selectedSeats}
          onBookTickets={handleBookTickets}
        />
      )}
      {showPaymentPage && (
        <PaymentPage
          totalPrice={calculateTotalPrice()}
          onConfirmPayment={handleConfirmPayment}
        />
      )}
      {showSuccessPage && <SuccessPage />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  movieItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieText: {
    fontSize: 16,
    color: '#000',
  },
  seatContainer: {
    marginTop: 20,
  },
  seatItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  selectedSeat: {
    backgroundColor: '#FFC107',
  },
  seatText: {
    fontSize: 16,
  },
});

export default App;
