/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WorkerUpdate = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dir, setDir] = useState('');
    const [rol, setRol] = useState('Recursos Rumanos');
    const [shouldShow, setShouldShow] = useState(false);

    const clear = () => {
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setDir('');
        setShouldShow(false);
    };

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

    const validateEmail = () => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validatePhoneNumber = () => {
        return /^\d{10}$/.test(phone);
    };

    const toUpdate = () => {
        if (!validatePhoneNumber()) {
                Alert.alert('Invalido numero de telefono');
                return;
        }
        if (!validateEmail()) {
            Alert.alert('Invalido email');
            return;
        }
        Alert.alert('Se ha actualizado');
        console.log('Worker Update:', {
            name,
            lastName,
            id,
            email,
            phone,
            dir,
            rol,
        });
        clear();
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
            {shouldShow ?
            (<><View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Jorge"
                        value={name}
                        onChangeText={(text) => setName(text)} />
                </View><View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Garcia"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)} />
                    </View><View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="email@dominio.com"
                            keyboardType={'email-address'}
                            value={email}
                            onChangeText={(text) => setEmail(text)} />
                    </View><View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Número de teléfono</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="3551355122"
                            keyboardType={'numeric'}
                            maxLength={10}
                            value={phone}
                            onChangeText={(text) => setPhone(text)} />
                    </View><View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Dirreccion</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cra 40 #60-37"
                            maxLength={30}
                            value={dir}
                            onChangeText={(text) => setDir(text)} />
                    </View><View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Rol</Text>
                        <Picker style={styles.Picker}
                            selectedValue={rol}
                            onValueChange={(itemValue, itemIndex) => setRol(itemValue)}>
                            <Picker.Item style={styles.label} label="Recursos Rumanos" value="Recursos Rumanos" />
                            <Picker.Item style={styles.label} label="Personal Administrativo" value="Personal Administrativo" />
                            <Picker.Item style={styles.label} label="Medico" value="Medico" />
                            <Picker.Item style={styles.label} label="Soporte de Información" value="Soporte de Información" />
                            <Picker.Item style={styles.label} label="Enfermera" value="Enfermera" />
                        </Picker>
                    </View><TouchableOpacity
                        style={styles.customButton}
                        onPress={toUpdate}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity></>) : null}
            <TouchableOpacity
                style={styles.customButton}
                onPress={searchWorker}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#73C6B6',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
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
        fontSize:22,
        color:'#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
    Picker:{
        backgroundColor:'#FFF',
    },
});

export default WorkerUpdate;
