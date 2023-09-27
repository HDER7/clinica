/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList,TextInput,TouchableOpacity} from 'react-native';

function ShowAssistance() {
    //SE Buscara la asistencia de un usurio especifico
    const [id, setId] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const searchAttendanceData = async () => {
        //Esta funcion se encarga de buscar la info en la BD
        try {
            const response = await fetch('DATABASE_ENDPOINT/users/${userId}/attendance');
            const data = await response.json();
            setAttendanceData(data);
        } catch (error) {
            console.error('Error fetching attendance data: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>ID(Cedula de ciudadanía)</Text>

            <TextInput
                style={styles.input}
                placeholder="13061116"
                keyboardType={'numeric'}
                value={id}
                onChangeText={(text) => setId(text)}
            />
            <TouchableOpacity
                style={styles.customButton}
                onPress={searchAttendanceData}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
            <FlatList
                data={attendanceData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.record}>
                    <Text>ID: {item.id}</Text>
                    <Text>Hora de inico: {item.startDate}</Text>
                    <Text>Hora de fin: {item.endDate}</Text>
                    <Text>Houras Trabajadas: {item.hoursWorked}</Text>
                </View>)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#73C6B6',
    },
    record: {
        backgroundColor: '#ECECEC',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 18,
        color:'#000',
    },
    customButton: {
        marginTop: 30,
        backgroundColor: '#FF5722',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput :{
        fontSize:25,
        color:'#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default ShowAssistance;
