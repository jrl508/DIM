import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Select = ({...props}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const { data } = props;
    const [listData, setListData] = useState( data || [{title: "Empty List", id:0}])

    const handleSelect = (item) => {
        setSelected(item);
        setOpen(!open);
    }

    const Item = ({item}) => {
        return (
            <TouchableOpacity style={styles.item_container} onPress={() => handleSelect(item)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
            { open ? 
            <FlatList style={styles.list} data={listData} renderItem={({item}) => {
            return (<Item item={item} />)
        }} 
        />
            :
            <Text style={selected ? styles.selected_label : styles.label}>{ selected ? selected.title : 'Select Option'}</Text>
            }
            <View style={styles.icon}>
                { open ? <Ionicons name='chevron-up' size={15} color='grey' /> : <Ionicons name='chevron-down' size={15} color='grey' /> }
            </View>
        </TouchableOpacity>
    )
}

export default Select;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 12,
        borderRadius: 4,
        borderColor: '#cecece',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 150
    },
    icon: {
        width: 25,
        alignItems: 'space-between',
        borderLeftWidth: 1,
        borderLeftColor: '#cecece'
    },
    label: {
        color: 'darkgrey'
    },
    selected_label: {
        color: 'black'
    },
    item_container: {
        padding: 10,
    },
    list: {
    }
  });