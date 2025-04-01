import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, StatusBar } from 'react-native';
import React, { useState, useRef } from 'react';
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

const Qrgenerator = () => {
    const [link, setLink] = useState("");
    const [qr, setQr] = useState("");
    const viewShotRef = useRef();

    // Function to capture and save QR Code
    const downloadQrCode = async () => {
        try {
            const uri = await viewShotRef.current.capture(); // Capture the view as an image
            const permission = await MediaLibrary.requestPermissionsAsync();

            if (permission.status === "granted") {
                await MediaLibrary.createAssetAsync(uri); // Save to gallery
                Alert.alert("Success", "QR Code saved to your gallery!");
            } else {
                Alert.alert("Permission Denied", "Allow access to save images.");
            }
        } catch (error) {
            console.error("Error saving QR Code:", error);
            Alert.alert("Error", "Could not save the QR Code.");
        }
    };

    return (
        <View style={{ flex: 1 ,backgroundColor:'#151515'}}>
                  <StatusBar backgroundColor="#151515" barStyle={'light-content'} />
            {/* Input & Generate Button */}
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor="white"
                    placeholder="Enter URL"
                    value={link}
                    onChangeText={setLink}
                />
                <TouchableOpacity style={styles.button} onPress={() => setQr(link)}>
                    <Text style={{ color: "#151515", textAlign: "center" }}>Generate</Text>
                </TouchableOpacity>
            </View>

            {/* QR Code & Download Button */}
            {qr ? (
                <View style={styles.qrContainer}>
                    <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
                        <View style={styles.qrCodeWrapper}>
                            <QRCode value={qr} size={200} backgroundColor="white" color="#151515" />
                        </View>
                    </ViewShot>

                    <TouchableOpacity style={styles.button} onPress={downloadQrCode}>
                        <Text style={{ color: "#151515", textAlign: "center" }}>Download</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};
// #e2ff8a
// #151515
// #212121
// #e6cc3b
// #282828
export default Qrgenerator;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#151515",
    },
    textInput: {
        width: "70%",
        padding: 17,
        borderWidth: 1,
        borderColor: "#5f5f5f",
        borderRadius: 20,
        color: "white",
    },
    button: {
        backgroundColor: "#e2ff8a",
        padding: 10,
        borderRadius: 15,
    },
    qrContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151515",
    },
    qrCodeWrapper: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
});