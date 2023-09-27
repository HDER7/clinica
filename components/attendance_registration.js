/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';

function AttendanceRegistration(){
    const [id, setId] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [hoursWorked, setHoursWorked] = useState(0);
    const [shouldShow, setShouldShow] = useState(false);
    const searchWorker = () => {
        if (id !== ''){
            //Aqui se buscara el trabajador
            //si el trabajador existe se debe registrar su asitencia
            setShouldShow(true);
        }
        else {
            setShouldShow(false);
            Alert.alert('El trabajador no existe');
        }
    };
    const calculateHoursWorked = () => {
        const millisecondsDiff = endDate - startDate;
        const hours = millisecondsDiff / (1000 * 60 * 60);
        setHoursWorked(hours);
    };
    const Register = () => {
        calculateHoursWorked();
        console.log(
            id,
            startDate.toLocaleDateString(),
            startDate.toLocaleTimeString().slice(0, 4) ,
            endDate.toLocaleTimeString().slice(0, 4),
            hoursWorked,
        );
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>ID(Cedula de ciudadanía)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="13061116"
                    keyboardType={'numeric'}
                    value={id}
                    onChangeText={(text) => setId(text)}
                />
            </View>
            <Text style={styles.textDate}>{startDate.toLocaleDateString()}</Text>
            {shouldShow ? (<>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Hora de Inicio</Text>
                    <DatePicker
                        style={styles.datePicker}
                        mode="time"
                        date={startDate}
                        onDateChange={setStartDate}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Hora de Fin</Text>
                    <DatePicker
                        style={styles.datePicker}
                        mode="time"
                        date={endDate}
                        onDateChange={setEndDate}
                    />
                </View>
                <Text style={styles.textDate}>Horas Trabajadas: {hoursWorked}</Text>
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={Register}>
                <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity></>
            ) : null}
            <TouchableOpacity
                style={styles.customButton}
                onPress={searchWorker}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#73C6B6',
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
    datePicker: {
        backgroundColor: '#FFFF',
    },
    textDate:{
        fontSize:30,
        color:'#000',
        fontWeight:'bold',
        alignSelf:'center',
    },
});

export default AttendanceRegistration;
