import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import React, { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';

const QRScanner = ({ onClose }) => {
    const [image, setImage] = useState(null);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    }
                );

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true;
        }
    };

    const openCamera = async () => {
        const isCameraPermitted = await requestCameraPermission();
        if (isCameraPermitted) {
            launchCamera(
                {
                    mediaType: 'photo',
                    maxWidth: 300,
                    maxHeight: 550,
                },
                (response) => {
                    if (response.errorCode) {
                        Alert.alert('Error', response.errorMessage);
                    } else {
                        console.log(response?.assets);
                        setImage(response?.assets);

                        // Handle QR code scanning here
                        // You can send the image to a backend service or use a local QR code decoding library
                        if (response?.assets && response.assets.length > 0) {
                            const imageUri = response.assets[0].uri;
                            // Call your QR code scanning logic here
                            scanQRCode(imageUri);
                        }
                    }
                }
            );
        } else {
            Alert.alert('Permission Denied', 'Camera access is required.');
        }
    };

    const scanQRCode = (imageUri) => {
        // Implement your QR code scanning logic here
        // For example, you can use a library like `react-native-qrcode-scanner` or a backend service
        console.log('Scanning QR code from image:', imageUri);
        // Mock example:
        Alert.alert('QR Code Scanned', 'Mock QR code data', [
            { text: 'OK', onPress: () => onClose() },
        ]);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={openCamera}
                style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, marginBottom: 10 }}
            >
                <Text style={{ color: 'white' }}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onClose}
                style={{ backgroundColor: 'red', padding: 15, borderRadius: 5 }}
            >
                <Text style={{ color: 'white' }}>Close Scanner</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QRScanner;