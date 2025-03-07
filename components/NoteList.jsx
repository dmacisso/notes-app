import { FlatList, View } from 'react-native';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        // * analogous to 'map' in JS.
        data={notes}
        keyExtractor={(item) => item.$id}
        // keyExtractor={(item) => {
        //   item.id;
        // }}
        // *  Destructure the iterator "item" and  return the JSX for display.
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

export default NoteList;
