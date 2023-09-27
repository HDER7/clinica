/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {Text, StyleSheet, Alert,TextInput,TouchableOpacity, ScrollView} from 'react-native';

function License(){
    const [id, setId] = useState('');
    const [hours, setHours] = useState('');
    const [shouldShow, setShouldShow] = useState(false);

    const searchWorker = () => {
        if (id !== ''){
            //Aqui se buscara el trabajador
            //si el trabajador existe se debe mostrar la info para actualizarla
            setShouldShow(true);
        }
        else {
            setShouldShow(false);
            Alert.alert('El trabajador no existe');
        }
    };

    const Register = () => {
        if (hours > 8 || hours < 1 ) {
            Alert.alert('Las licencias son de 1 a 8 horas');
            return;
        }
        console.log(
            id,
            hours
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textInput}>ID(Cedula de ciudadanía)</Text>
            <TextInput
                style={styles.input}
                placeholder="13061116"
                keyboardType={'numeric'}
                value={id}
                inputMode={'numeric'}
                onChangeText={(text) => setId(text)}
            />
            {shouldShow ? (<>
                <Text style={styles.textInput}>Horas de la licencia</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Maximo 8 horas"
                    keyboardType={'numeric'}
                    value={hours}
                    inputMode={'numeric'}
                    maxLength={1}
                    onChangeText={(text) => setHours(text)}
                />
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={Register}>
                    <Text style={styles.buttonText}>Registrar licencia</Text>
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

export default License;
