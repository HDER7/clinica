/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert , Modal, TouchableWithoutFeedback} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const WorkerRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dir, setDir] = useState('');
    const [rol, setRol] = useState('Recursos Rumanos');
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const format = moment(date).format('DD/MM/YYYY');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const validatepass = () => {
        return (/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(password));
    };

    const validateUsername = () => {
        return (username !== 'Juancho12');
    };

    const validateEmail = () => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validatePhoneNumber = () => {
        return /^\d{10}$/.test(phone);
    };

    const toRegister = () => {
        if (!validatePhoneNumber()) {
                Alert.alert('Invalido numero de telefono');
                return;
        }
        if (!validateEmail()) {
            Alert.alert('Invalido email');
            return;
        }
        if (!validateUsername()) {
            Alert.alert('Nombre de usuario en uso');
            return;
        }
        if (!validatepass()) {
            Alert.alert('Contraseña no valida');
            return;
        }
        console.log('Worker Registration:', {
            name,
            lastName,
            id,
            email,
            phone,
            dir,
            rol,
            username,
            password,
            date: format,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Nombre</Text>
                <TextInput
                style={styles.input}
                placeholder="Jorge"
                value={name}
                onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Garcia"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>
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
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Correo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email@dominio.com"
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Número de teléfono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="3551355122"
                    keyboardType={'numeric'}
                    maxLength={10}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Fecha de Nacimiento</Text>
                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={showDatePicker}>
                    <Text style={styles.datePickerButtonText}>Seleccionar Fecha</Text>
                </TouchableOpacity>
                <Modal
                    visible={isDatePickerVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={hideDatePicker}>
                <TouchableWithoutFeedback
                    onPress={hideDatePicker}>
                    <View style={styles.modalContainer}>
                <TouchableWithoutFeedback
                    onPress={(e) => e.stopPropagation()}>
                    <View style={styles.modalContent}>
                    <Text style={styles.textInput}>Fecha de Nacimiento</Text>
                    <DatePicker
                        mode="date"
                        date={date}
                        onDateChange={setDate}
                    />
                    <TouchableOpacity
                        onPress={hideDatePicker}
                        style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
                </Modal>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Dirreccion</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cra 40 #60-37"
                    maxLength={30}
                    value={dir}
                    onChangeText={(text) => setDir(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Rol</Text>
                <Picker style={styles.Picker}
                    selectedValue={rol}
                    onValueChange={(itemValue, itemIndex) =>
                    setRol(itemValue)
                    }>
                    <Picker.Item style={styles.label} label="Recursos Rumanos" value="Recursos Rumanos" />
                    <Picker.Item style={styles.label} label="Personal Administrativo" value="Personal Administrativo" />
                    <Picker.Item style={styles.label} label="Medico" value="Medico" />
                    <Picker.Item style={styles.label} label="Soporte de Información" value="Soporte de Información" />
                    <Picker.Item style={styles.label} label="Enfermera" value="Enfermera" />
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Juancho12"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Contraseña</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Asdsdsds125#"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.customButton}
                onPress={toRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
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
    datePicker: {
        marginTop: 8,
        backgroundColor: '#FFF',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 18,
    },
    datePickerButton: {
        backgroundColor: '#0083FF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    datePickerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight:'bold',
    },
});

export default WorkerRegister;
