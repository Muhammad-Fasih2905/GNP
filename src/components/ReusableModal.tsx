// components/ReusableModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import { AppColors } from '../theme';
import { hp } from '../const';

interface ReusableModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    modalViewStyle?: StyleProp<ViewStyle>
}

const ReusableModal: React.FC<ReusableModalProps> = ({ modalViewStyle, visible, onClose, title, children }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
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
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent background
    },
    modalView: {
        flex: 1,
        width: '90%',
        height: '95%',
        // margin: 20,
        // height: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.white,
        borderRadius: 8,
        // paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
        width: '100%',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReusableModal;
