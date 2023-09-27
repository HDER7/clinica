/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const RegisterPatient = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cc, setCC] = useState('');
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dir, setDir] = useState('');
    const [gender, setGender] = useState('Otro');
    const [id, setId] = useState();
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [insuranceCompanyName, setInsuranceCompanyName] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [isPolicyActive, setIsPolicyActive] = useState(false);
    const format = moment(date).format('DD/MM/YYYY');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const validateID = () => {
        //SE VALIDARA SI EL ID EXISTE
        return /1/.test(id);
    };

    const validatePhoneNumber = () => {
        return /^\d{10}$/.test(phone);
    };

    const toRegister = () => {
        if (!validateID()) {
            Alert.alert('el ID ya esta en uso');
            return;
        }
        if (!validatePhoneNumber()) {
            Alert.alert('Invalido numero de telefono');
            return;
        }
        if (!emergencyContactName || !emergencyContactRelation || !emergencyContactPhone) {
            Alert.alert('Por favor, ingrese la información del contacto de emergencia');
            return;
        }
        const patientData = {
            name: name,
            lastName: lastName,
            ID: id,
            CC: cc,
            email: email,
            phone: phone,
            dir: dir,
            gender: gender,
            birthday: format,
            emergencyContact: {
                name: emergencyContactName,
                relation: emergencyContactRelation,
                phone: emergencyContactPhone,
            },
            insurance: {
                companyName: insuranceCompanyName,
                policyNumber: policyNumber,
                isPolicyActive: isPolicyActive,
            },
        };
        console.log('Patient:', patientData);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Paciente</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Numero de indentificacion unico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="100100"
                    value={id}
                    onChangeText={(text) => setId(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Nombre del paciente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Jorge"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Apellido del paciente</Text>
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
                    placeholder="1306111622"
                    keyboardType={'numeric'}
                    value={cc}
                    maxLength={10}
                    onChangeText={(text) => setCC(text)}
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
                <Text style={styles.textInput}>Genero</Text>
                <Picker style={styles.Picker}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item style={styles.label} label="Otro" value="Otro" />
                    <Picker.Item style={styles.label} label="Masculino" value="Masculino" />
                    <Picker.Item style={styles.label} label="Femenino" value="Femenino" />
                </Picker>
            </View>
            <Text style={styles.title}>Contacto de emergencia</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Nombre del contacto de emergencia</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del contacto"
                    value={emergencyContactName}
                    onChangeText={(text) => setEmergencyContactName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Relación con el paciente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Relación con el paciente"
                    value={emergencyContactRelation}
                    onChangeText={(text) => setEmergencyContactRelation(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Número de teléfono de emergencia</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número de teléfono de emergencia"
                    keyboardType={'numeric'}
                    maxLength={10}
                    value={emergencyContactPhone}
                    onChangeText={(text) => setEmergencyContactPhone(text)}
                />
            </View>
            <Text style={styles.title}>Seguro Médico</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Nombre de la compañía de seguros</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la compañía de seguros médicos"
                    value={insuranceCompanyName}
                    onChangeText={(text) => setInsuranceCompanyName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Número de póliza</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número de póliza del seguro médico"
                    value={policyNumber}
                    onChangeText={(text) => setPolicyNumber(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>Estado de la póliza</Text>
                <Picker
                    style={styles.Picker}
                    selectedValue={isPolicyActive}
                    onValueChange={(itemValue, itemIndex) =>
                        setIsPolicyActive(itemValue)
                    }>
                    <Picker.Item style={styles.label} label="Activa" value={true} />
                    <Picker.Item style={styles.label} label="Inactiva" value={false} />
                </Picker>
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
        backgroundColor: '#73C6B6',
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
        color: '#000',
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
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
    Picker: {
        backgroundColor: '#EFFFEF',
        color:'#000',
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
        fontWeight: 'bold',
    },
    title:{
        fontSize:35,
        color: '#000',
        fontWeight:'bold',
        top: 15,
    },
});

export default RegisterPatient;
