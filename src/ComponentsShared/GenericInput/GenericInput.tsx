import { t } from 'i18next';
import React from 'react';
import {
  ColorValue,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../Constants/Colors';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';
import GenericText from '../GenericText/GenericText';

interface GenericTextInputProps {
  inputType: 'formInput' | 'SearchInput';
  onChangeText?: (text: string) => void;
  onPressSearch?: () => void;
  placeHolder?: string;
  title?: string;
  required?: boolean;
  errorText?: string | boolean;
  disabled?: boolean;
  icon?: any;
  value?: any;
  keyboardType?: any;
  returnKeyType?: any;
  secureTextEntry?: boolean;
  auto?: boolean;
  textInputContainerPropedStyles?: ViewStyle;
  textInputTitlePropedStyles?: object;
  textInputErrorPropedStyles?: object;
  inputPropedStyle?: object;
  textInputIconPropedStyles?: object;
  textInputPropedContainerStyles?: object;
  placeHolderColor?: ColorValue;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: (e: any) => void;
}

const GenericTextInput: React.FC<GenericTextInputProps> = ({
  inputType,
  onChangeText,
  onPressSearch,
  placeHolder,
  title,
  required = false,
  errorText,
  disabled = true,
  icon,
  value,
  keyboardType,
  returnKeyType = 'done',
  secureTextEntry,
  auto = false,
  textInputContainerPropedStyles,
  textInputTitlePropedStyles,
  textInputErrorPropedStyles,
  inputPropedStyle,
  textInputIconPropedStyles,
  textInputPropedContainerStyles,
  placeHolderColor,
  maxLength,
  onFocus,
  onBlur,
}) => {
  const textInputContainer = [
    styles.textInputContainer,
    !disabled && styles.disabledInput,
  ];

  let TextInputElement;

  switch (inputType) {
    case 'formInput':
      TextInputElement = (
        <View
          style={[
            styles.textInputContainerStyles,
            textInputContainerPropedStyles,
          ]}
        >
          {title && (
            <View style={styles.requiredTextContainer}>
              {required && <Text style={styles.requiredDot}>*</Text>}
              <Text
                numberOfLines={1}
                style={[
                  styles.textInputTitleStyles,
                  textInputTitlePropedStyles,
                ]}
              >
                {title}
              </Text>
            </View>
          )}
          <View style={[...textInputContainer, textInputPropedContainerStyles]}>
            <TextInput
              style={[styles.inputStyle, inputPropedStyle]}
              placeholder={placeHolder}
              onChangeText={onChangeText}
              value={value}
              placeholderTextColor={placeHolderColor || Colors.black}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              secureTextEntry={secureTextEntry}
              autoFocus={auto}
              autoCapitalize="none"
              autoCorrect={false}
              editable={disabled}
              onFocus={onFocus}
              maxLength={maxLength}
              onBlur={onBlur}
            />
            {icon && (
              <Image
                source={icon}
                style={[styles.textInputIcon, textInputIconPropedStyles]}
              />
            )}
          </View>
          {errorText && (
            <Text
              style={[styles.textInputErrorStyles, textInputErrorPropedStyles]}
            >
              {errorText}
            </Text>
          )}
        </View>
      );
      break;
    case 'SearchInput':
      TextInputElement = (
        <View
          style={[
            styles.searchInputContainerStyles,
            textInputContainerPropedStyles,
          ]}
        >
          <View
            style={[
              styles.searchInputContainer,
              textInputPropedContainerStyles,
            ]}
          >
            <TextInput
              style={[styles.searchInputStyle, inputPropedStyle]}
              placeholder={t('search.searchProduct')}
              onChangeText={onChangeText}
              value={value}
              placeholderTextColor={Colors.dark}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              secureTextEntry={secureTextEntry}
              autoFocus={auto}
              autoCapitalize="none"
              autoCorrect={false}
              editable={disabled}
              onFocus={onFocus}
              maxLength={maxLength}
            />
            {icon && icon}
          </View>
          <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
            <GenericText
              textType={'Universal'}
              text={t('search.search')}
              textStyles={styles.searchTextStyles}
            />
          </TouchableOpacity>
        </View>
      );
      break;

    default:
      break;
  }

  return TextInputElement;
};

export default GenericTextInput;

const styles = StyleSheet.create({
  textInputContainerStyles: {
    width: '80%',
    height: 75,
    alignItems: 'flex-start',
    marginVertical: 10,
    alignSelf: 'center',
    zIndex: -1,
  },
  textInputTitleStyles: {
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(15),
    lineHeight: getFontSizeByWindowWidth(20),
    fontWeight: '400',
  },
  inputStyle: {
    width: '87%',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(18),
    fontWeight: '400',
    textAlign: 'left',
  },
  searchInputStyle: {
    width: '87%',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: Colors.dark,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '400',
    textAlign: 'left',
  },
  disabledInput: {
    opacity: 0.4,
    backgroundColor: Colors.dark,
  },
  textInputErrorStyles: {
    color: Colors.red,
    fontSize: getFontSizeByWindowWidth(12),
    lineHeight: getFontSizeByWindowWidth(18),
    fontWeight: '400',
    textAlign: 'left',
  },
  requiredDot: {
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '700',
    color: Colors.red,
    marginRight: 3,
  },
  requiredTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  textInputContainer: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '80%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainerStyles: {
    width: '94%',
    height: 50,
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: Colors.gray3,
    borderRadius: 16,
    height: 40,
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextStyles: {
    color: Colors.dark,
    fontSize: getFontSizeByWindowWidth(12),
    fontWeight: '600',
  },
  textInputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    end: 20,
    resizeMode: 'cover',
  },
});
