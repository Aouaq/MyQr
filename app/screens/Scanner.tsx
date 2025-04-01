import { Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView } from "expo-camera";

const Scanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [qrData, setQrData] = useState(null); // To store QR code data

    const pickDoc = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: false,
            });

            if (!result.canceled && result.assets?.length > 0) {
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
            {!isCameraActive ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.btnDocPicker} onPress={pickDoc}>
                        <Text style={styles.buttonText}>+ Select From Device</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDocPicker} onPress={() => setIsCameraActive(true)}>
                        <View style={styles.iconContainer}>
                            <AntDesign name="camerao" size={24} color="black" />
                            <Text style={{ marginLeft: 5 }}>Scan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={StyleSheet.absoluteFillObject}>
                    {/* Back Button */}
                    <Pressable style={styles.backButton} onPress={() => setIsCameraActive(false)}>
                        <AntDesign name="arrowleft" size={28} color="white" />
                    </Pressable>

                    {/* Camera View */}
                    <CameraView
                        style={styles.cameraView}
                        facing="back"
                        onBarcodeScanned={({ data }) => {
                            setQrData(data); // Save scanned QR data
                            Linking.canOpenURL(data).then((supported) => {
                                if (supported) {
                                    Linking.openURL(data);
                                }
                                else{
                                    console.log(data)
                                    setIsCameraActive(false)
                                    
                                }
                            });
                        }}
                    />
                </View>
            )}

            {/* Display selected file or QR data */}
            {selectedFile && !isCameraActive && (
                <Text style={styles.fileText}>
                    Selected File: {selectedFile.name} ({selectedFile.mimeType})
                </Text>
            )}

            {/* Display QR Code data */}
            {qrData && !isCameraActive && (
                <Text style={styles.fileText}>
                    QR Code content: {qrData}
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
    cameraView: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 50,
    },
});