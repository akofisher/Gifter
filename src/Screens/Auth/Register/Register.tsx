import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import Profile from '../../../../assets/svg/User.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericTextInput from '../../../ComponentsShared/GenericInput/GenericInput';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import Screens, { NavigationParams } from '../../../Navigation/Screens';

const Register = () => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(2, t('errors.firstNameMin'))
      .max(30, t('errors.firstNameMax'))
      .required(t('errors.firstNameRequired')),

    last_name: Yup.string()
      .trim()
      .min(2, t('errors.lastNameMin'))
      .max(30, t('errors.lastNameMax'))
      .required(t('errors.lastNameRequired')),

    phone: Yup.string()
      .trim()
      .matches(/^(\+?\d{8,15})$/, t('errors.phoneInvalid'))
      .required(t('errors.phoneRequired')),

    email: Yup.string()
      .trim()
      .email(t('errors.emailInvalid'))
      .required(t('errors.emailRequired')),

    password: Yup.string()
      .trim()
      .min(6, t('errors.passwordMin'))
      .max(100, t('errors.passwordMax'))
      .required(t('errors.passwordRequired')),

    confirm_password: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], t('errors.passwordsMustMatch'))
      .required(t('errors.confirmPasswordRequired')),
  });

  const initialFormValues = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  const inputRefs = {
    first_name: useRef<any>(null),
    last_name: useRef<any>(null),
    phone: useRef<any>(null),
    email: useRef<any>(null),
    password: useRef<any>(null),
    confirm_password: useRef<any>(null),
  };

  const scrollToInput = (ref: React.RefObject<any>) => {
    ref.current?.measureLayout(
      // @ts-ignore
      scrollRef.current?.getInnerViewNode(),
      (_x: number, y: number) => {
        scrollRef.current?.scrollTo({ y: y - 20, animated: true });
      },
      () => {},
    );
  };

  return (
    <BackgroundContainer containerStyles={{ position: 'relative' }}>
      {/* <View style={styles.goBackContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          activeOpacity={0.7}
        >
          <LeftArrow width={16} height={14} />
        </TouchableOpacity>
      </View> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.headerContainer}>
          <GenericText
            textType={'Title'}
            text={t('auth.registrationTitle')}
            textStyles={{ paddingTop: 30, paddingBottom: 10, fontSize: 30 }}
          />
          <GenericText
            textType={'SubTitle'}
            text={
              t('auth.registrationSubTitle') ||
              'Fill the fields below to create your account'
            }
            textStyles={{ opacity: 0.8 }}
          />
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            onSubmit={values => {
              const payload = { ...values };
              delete (payload as any).confirm_password;
              console.log('register payload:', payload);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <>
                {Object.entries(initialFormValues).map(([key]) => {
                  const error =
                    touched[key as keyof typeof values] &&
                    errors[key as keyof typeof values];

                  const value = values[key as keyof typeof values];

                  const titleMap: any = {
                    first_name: t('forms.name'),
                    last_name: t('forms.lastName'),
                    phone: t('forms.phone'),
                    email: t('forms.email'),
                    password: t('forms.password'),
                    confirm_password: t('forms.confirmPassword'),
                  };

                  const isPasswordField =
                    key === 'password' || key === 'confirm_password';

                  return (
                    <GenericTextInput
                      key={key}
                      inputType="formInput"
                      title={titleMap[key]}
                      required
                      placeHolder={
                        key === 'confirm_password'
                          ? String(titleMap[key])
                          : `${t('forms.fill')} ${String(
                              titleMap[key],
                            ).toLowerCase()}`
                      }
                      value={value}
                      onChangeText={handleChange(key)}
                      onFocus={() => {
                        setFieldTouched(key);
                        scrollToInput(inputRefs[key as keyof typeof inputRefs]);
                      }}
                      errorText={error as string}
                      icon={Profile}
                      secureTextEntry={isPasswordField}
                      keyboardType={
                        key === 'email'
                          ? 'email-address'
                          : key === 'phone'
                          ? 'phone-pad'
                          : 'default'
                      }
                      inputPropedStyle={{ fontSize: 16 }}
                      textInputPropedContainerStyles={{
                        borderColor: error ? Colors.red : Colors.gray3,
                      }}
                      placeHolderColor={Colors.dark}
                      // @ts-ignore
                      ref={inputRefs[key]}
                    />
                  );
                })}

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>
                    {t('button.submitRegistration')}
                  </Text>
                </TouchableOpacity>

                <View style={styles.footerRow}>
                  <GenericText
                    textType={'SubTitle'}
                    text={t('auth.haveAccount')}
                    textStyles={{}}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      // @ts-ignore
                      navigation.navigate(Screens.Login)
                    }
                    activeOpacity={0.7}
                  >
                    <GenericText
                      textType={'SubTitle'}
                      text={t('auth.loginTitle')}
                      textStyles={{ color: Colors.mein }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  formContainer: {
    paddingBottom: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  submitBtn: {
    width: '90%',
    backgroundColor: Colors.mein,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 18,
    gap: 8,
  },
});
