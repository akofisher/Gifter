import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import LeftArrow from '../../../../assets/svg/LeftArrow.svg';
import Profile from '../../../../assets/svg/User.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericTextInput from '../../../ComponentsShared/GenericInput/GenericInput';
import GenericModal from '../../../ComponentsShared/GenericModal/GenericModal';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import { NavigationParams } from '../../../Navigation/Screens';

type ModalState =
  | { visible: false }
  | {
      visible: true;
      type: 'success' | 'error';
      title: string;
      message: string;
    };

const Recover = () => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);
  const { t, i18n } = useTranslation();

  const [modal, setModal] = useState<ModalState>({ visible: false });

  const initialFormValues = {
    email: '',
  };

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .trim()
          .email(t('errors.emailInvalid'))
          .required(t('errors.emailRequired')),
      }),
    [i18n.language],
  );

  const inputRefs = {
    email: useRef<any>(null),
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

  const closeModal = () => setModal({ visible: false });

  const fakeRecoverRequest = async (email: string) => {
    // simulate API
    await new Promise<void>(resolve => setTimeout(resolve, 900));

    // demo logic: error if email includes "fail"
    if (email.toLowerCase().includes('fail')) {
      throw new Error('fail');
    }
  };

  return (
    <BackgroundContainer containerStyles={{ position: 'relative' }}>
      <View style={styles.goBackContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          activeOpacity={0.7}
        >
          <LeftArrow width={16} height={14} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.headerContainer}>
          <GenericText
            textType={'Title'}
            text={t('auth.recoverTitle')}
            textStyles={{ paddingTop: 30, paddingBottom: 10 }}
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
            onSubmit={async values => {
              try {
                await fakeRecoverRequest(values.email);

                setModal({
                  visible: true,
                  type: 'success',
                  title: t('recover.modalSuccessTitle'),
                  message: t('recover.modalSuccessText'),
                });
              } catch (e) {
                setModal({
                  visible: true,
                  type: 'error',
                  title: t('recover.modalErrorTitle'),
                  message: t('recover.modalErrorText'),
                });
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
              isSubmitting,
            }) => {
              const emailError = touched.email && errors.email;

              return (
                <>
                  <GenericTextInput
                    inputType="formInput"
                    title={t('forms.email')}
                    required
                    placeHolder={`${t('forms.fill')} ${String(
                      t('forms.email'),
                    ).toLowerCase()}`}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onFocus={() => {
                      setFieldTouched('email');
                      scrollToInput(inputRefs.email);
                    }}
                    errorText={emailError as string}
                    icon={Profile}
                    keyboardType="email-address"
                    inputPropedStyle={{ fontSize: 16 }}
                    textInputPropedContainerStyles={{
                      borderColor: emailError ? Colors.red : Colors.gray3,
                    }}
                    placeHolderColor={Colors.dark}
                    // @ts-ignore
                    ref={inputRefs.email}
                  />

                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => handleSubmit()}
                    activeOpacity={0.8}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.submitText}>
                      {t('button.submitRecover')}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      <GenericModal visible={modal.visible} onClose={closeModal}>
        {'visible' in modal && modal.visible ? (
          <View style={{ width: '100%', gap: 14 }}>
            <GenericText
              textType="Title"
              text={modal.title}
              textStyles={{
                textAlign: 'center',
                color: modal.type === 'error' ? Colors.red : Colors.gr,
              }}
            />

            <GenericText
              textType="Title"
              text={modal.message}
              textStyles={{ textAlign: 'center', lineHeight: 22 }}
            />
          </View>
        ) : null}
      </GenericModal>
    </BackgroundContainer>
  );
};

export default Recover;

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  formContainer: {
    paddingBottom: 50,
    paddingHorizontal: 20,
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
  goBackContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  goBackButton: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
