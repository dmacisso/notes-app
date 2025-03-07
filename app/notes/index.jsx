import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import NoteList from '@/components/NoteList';
import AddNoteModal from '@/components/AddNoteModal';
import noteService from '@/services/noteService';

const NotesScreen = () => {
  // * MARK: State
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //* MARK: Effect
  useEffect(() => {
    fetchNotes();
  }, []);

  //* MARK: Functions

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    // console.log("Refresh notes", response)
    if (response.error) {
      setError(response.error);
      //* Alert comes from react-native
      Alert.alert('Error', response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);
  };

  // - Add Note Function
  const addNote = async () => {
    if (newNote.trim === '') return;
    // setNotes((prevNotes) => [
    //   ...prevNotes,
    //   {
    //     id: Date.now.toString(),
    //     text: newNote,
    //   },
    // ]);
    //* Interact with Appwrite
    const response = await noteService.addNote(newNote);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote('');
    setModalVisible(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
    //takes in title, confirmation message, an array of objects(buttons),
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert('Error', response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  // Edit Note
  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert('Error', 'Notes text cannot be empty');
      return;
    }
    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  };

  //* MARK: JSX
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      {/* Modal */}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

// MARK: Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default NotesScreen;
