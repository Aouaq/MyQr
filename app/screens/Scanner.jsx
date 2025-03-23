import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import QRScanner from './QRscanner'; // Ensure the import path is correct

const Scanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const pickDoc = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: false,
            });

            if (!result.canceled && result.assets.length > 0) {
                setSelectedFile(result.assets[0]);
                alert(`Selected File: ${result.assets[0].name}`);
            } else {
                alert("Document selection was canceled.");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            {!isScanning ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnDocPicker} onPress={pickDoc}>
                        <Text style={styles.buttonText}>+ Select From Device</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDocPicker} onPress={() => setIsScanning(true)}>
                        <View style={styles.iconContainer}>
                            <AntDesign name="camerao" size={24} color="black" />
                            <Text style={{ marginLeft: 5 }}>Scan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <QRScanner onClose={() => setIsScanning(false)} />
            )}

            {selectedFile && !isScanning && (
                <Text style={styles.fileText}>
                    Selected File: {selectedFile.name} ({selectedFile.mimeType})
                </Text>
            )}
        </View>
    );
};

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'space-evenly',
    },
    btnDocPicker: {
        backgroundColor: '#e2ff8a',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#151515',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileText: {
        color: 'white',
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
    },
});