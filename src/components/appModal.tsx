import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, StatusBar, SafeAreaView } from 'react-native';
import { AppColors } from '../theme';
import { BlurView } from '@react-native-community/blur';
import { hp } from '../const';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface ReusableModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    modalViewStyle?: any
}

const ReusableModal: React.FC<ReusableModalProps> = ({ visible, onClose, title, children, modalViewStyle }) => {
    return (
        <SafeAreaProvider>
            {visible && <StatusBar hidden={true} />}
            {/* <SafeAreaView > */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <BlurView
                    style={{ flex: 1 }}
                    blurType='chromeMaterialLight'
                    blurAmount={10}
                    reducedTransparencyFallbackColor='white'
                >
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.centeredView}>
                            <TouchableWithoutFeedback>
                                <View style={[styles.modalView, modalViewStyle]}>
                                    {title && <Text style={styles.modalTitle}>{title}</Text>}
                                    <View style={styles.modalContent}>{children}</View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </BlurView>
            </Modal>
            {/* </SafeAreaView> */}
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        width: '95%',
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContent: {
        width: '100%',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReusableModal;