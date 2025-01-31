import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import GlobalIcon from '../utils/GlobalIcon';
import { AppColors, AppFonts, AppRadius, fontSizes } from '../theme';
import { hp, wp } from '../const';

interface InputProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  labelStyles?: any;
  styleInputC?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  stylesInput?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  labelStyles,
  styleInputC,
  containerStyle,
  stylesInput,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyles]}>{label}</Text>}
      <View style={[styles.inputContainer, styleInputC]}>
        <TextInput
          {...props}
          style={[styles.input, error && styles.inputError, stylesInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholderTextColor={AppColors.gray700}
        />
        {secureTextEntry && (
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <GlobalIcon name={'lock'} library='Entypo' size={20} color={AppColors.gray600} />
            ) : (
              <GlobalIcon name={'lock-open'} library='Entypo' size={20} color={AppColors.gray600} />
            )}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    

  },
  label: {
    fontSize: fontSizes.xs,
    marginBottom: 8,
    color: AppColors.white,
    fontFamily: AppFonts.regular
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: AppColors.gray600,
    borderRadius: AppRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  input: {
    flex: 1,
    fontFamily: AppFonts.regular,
    lineHeight: 26,
    fontSize: fontSizes.sm,
    paddingLeft: hp(2),
    color: AppColors.white
  },
  inputError: {
    borderColor: AppColors.error,

  },
  eyeIcon: {
    paddingRight: wp(2)
  },
  errorText: {
    color: AppColors.error,
    fontSize: fontSizes.xs,
    marginTop: 4,
  },
});

export default Input;