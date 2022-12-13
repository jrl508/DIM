import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Select = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const { data, onSelect, initialVal } = props;
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
    setOpen(!open);
  };

  useEffect(() => {
    setSelected(initialVal);
  }, [initialVal]);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item_container}
        onPress={() => handleSelect(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
      {open ? (
        <View style={styles.list}>
          {data.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </View>
      ) : (
        //     <FlatList style={styles.list} data={listData} renderItem={({item}) => {
        //     return (<Item item={item} />)
        // }}
        // />
        <Text style={selected ? styles.selected_label : styles.label}>
          {selected ? selected : "Select Option"}
        </Text>
      )}
      <View style={styles.icon}>
        {open ? (
          <Ionicons name="chevron-up" size={15} color="grey" />
        ) : (
          <Ionicons name="chevron-down" size={15} color="grey" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 4,
    borderColor: "#cecece",
    flexDirection: "row",
    justifyContent: "space-between",
    //maxHeight: 150
  },
  icon: {
    width: 25,
    alignItems: "space-between",
    borderLeftWidth: 1,
    borderLeftColor: "#cecece",
  },
  label: {
    color: "darkgrey",
  },
  selected_label: {
    color: "black",
  },
  item_container: {
    padding: 10,
  },
  list: {},
});
