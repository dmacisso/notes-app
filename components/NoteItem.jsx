import { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const NoteItem = ({ note, onDelete, onEdit }) => {
  // console.log('NOTE:', note);
  //MARK: State
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);

  //MARK: Functions
  const handleSave = () => {
    if (editedText.trim() === '') return;
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };

  // MARK: JSX
  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              inputRef.current?.blur(); //* outside of the text input..
            }}
          >
            <Text style={styles.edit}> 💾 </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}> 📝 </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}> ❌ </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//MARK: StylesSheet
const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: 'red',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
});

export default NoteItem;
