import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';

import { t } from 'i18next';
import SliderMenu from '../../ComponentsShared/SliderMenu/SliderMenu';
import { Colors } from '../../Constants/Colors';
import { User } from '../../Data/Data';
import { CategoryInterface } from '../../Services/NewsData';

// Example dynamic forbidden words array
const forbiddenWords = ['scam', 'fake', 'banned'];
// later you can set this from Redux, props, API, etc.

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required')
    .test('forbidden-words', 'Title contains forbidden text', value => {
      if (!value) return true;
      return !forbiddenWords.some(word =>
        value.toLowerCase().includes(word.toLowerCase()),
      );
    }),
  description: Yup.string()
    .trim()
    .min(10, 'Too short')
    .required('Description is required')
    .test('forbidden-words', 'Description contains forbidden text', value => {
      if (!value) return true;
      return !forbiddenWords.some(word =>
        value.toLowerCase().includes(word.toLowerCase()),
      );
    }),
  category_id: Yup.string().required('Category is required'),
  giftOrExchange: Yup.number().oneOf([1, 2]).required(),
  images: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one image')
    .max(6, 'Max 6 images'),
});

type FormValues = {
  title: string;
  description: string;
  category: string;
  category_id: string;
  giftOrExchange: 1 | 2;
  images: string[];
};

const initialValues: FormValues = {
  title: '',
  description: '',
  category: '',
  category_id: '',
  giftOrExchange: 1,
  images: [],
};

const AddProductForm: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryInterface | null>(null);

  // Scroll helper
  const scrollTo = (y: number) => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 20), animated: true });
    });
  };

  // Image picker
  const pickImages = async (
    currentCount: number,
    addImages: (next: string[]) => void,
  ) => {
    const remaining = 6 - currentCount;
    if (remaining <= 0) return;

    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: remaining,
      includeBase64: true,
      quality: 0.9,
    });

    if (res.didCancel || !res.assets) return;

    const base64Batch: string[] = [];
    res.assets.forEach((a: Asset) => {
      if (a.base64) base64Batch.push(a.base64);
    });

    if (base64Batch.length) addImages(base64Batch);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            const payload = {
              ...values,
              owner: `${User?.first_name ?? ''} ${
                User?.last_name ?? ''
              }`.trim(),
              ownerNumber: User?.phone ?? '',
              giftedOrExchanged: 1,
            };
            console.log('FINAL PAYLOAD:', payload);
            // Call your API with payload
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {
            const addImages = (arr: string[]) => {
              const next = [...values.images, ...arr].slice(0, 6);
              setFieldValue('images', next);
            };
            const removeImageAt = (idx: number) => {
              const next = values.images.filter((_, i) => i !== idx);
              setFieldValue('images', next);
            };

            return (
              <View>
                {/* Gift / Exchange */}
                <Text style={styles.sectionTitle}>
                  {t('forms.goingto')} <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.radioRow}>
                  <TouchableOpacity
                    style={[
                      styles.radioBtn,
                      values.giftOrExchange === 1 && styles.radioBtnActive,
                    ]}
                    onPress={() => setFieldValue('giftOrExchange', 1)}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        values.giftOrExchange === 1 && styles.radioTextActive,
                      ]}
                    >
                      {t('forms.gave')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioBtn,
                      values.giftOrExchange === 2 && styles.radioBtnActive,
                    ]}
                    onPress={() => setFieldValue('giftOrExchange', 2)}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        values.giftOrExchange === 2 && styles.radioTextActive,
                      ]}
                    >
                      {t('forms.exchange')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Category */}
                <Text style={styles.sectionTitle}>
                  {t('forms.category')} <Text style={styles.required}>*</Text>
                </Text>
                <SliderMenu
                  onPress={(item: CategoryInterface) => {
                    setSelectedCategory(item);
                    setFieldValue('category', item.name || '');
                    setFieldValue('category_id', String(item.id ?? ''));
                  }}
                  choosenId={selectedCategory?.id}
                />
                {touched.category_id && errors.category_id ? (
                  <Text style={styles.errorText}>
                    {String(errors.category_id)}
                  </Text>
                ) : null}
                {selectedCategory ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{selectedCategory.name}</Text>
                  </View>
                ) : null}
                <View style={styles.inputsContainer}>
                  {/* Title */}
                  <Text style={styles.label}>
                    {t('forms.title')} <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    style={[
                      styles.textArea,
                      touched.title && errors.title
                        ? { borderColor: Colors.red }
                        : null,
                      { minHeight: 50 }, // shorter than description
                    ]}
                    placeholder={t('forms.exampletitle')}
                    placeholderTextColor={Colors.dark}
                  />
                  {touched.title && errors.title ? (
                    <Text style={styles.errorText}>{String(errors.title)}</Text>
                  ) : null}

                  {/* Description */}
                  <Text style={styles.label}>
                    {t('forms.description')}{' '}
                    <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    style={[
                      styles.textArea,
                      touched.description && errors.description
                        ? { borderColor: Colors.red }
                        : null,
                    ]}
                    placeholder={t('forms.exampledescription')}
                    placeholderTextColor={Colors.dark}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                  {touched.description && errors.description ? (
                    <Text style={styles.errorText}>
                      {String(errors.description)}
                    </Text>
                  ) : null}

                  {/* Images */}
                  <Text style={styles.sectionTitle}>
                    {t('forms.images')} <Text style={styles.required}>*</Text>
                  </Text>
                  <View style={styles.imagesRow}>
                    {values.images.map((b64, idx) => (
                      <View
                        key={`${idx}-${b64.slice(0, 16)}`}
                        style={styles.imageWrap}
                      >
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${b64}` }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.removeImageBtn}
                          onPress={() => removeImageAt(idx)}
                        >
                          <Text style={styles.removeImageText}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    {values.images.length < 6 && (
                      <TouchableOpacity
                        style={styles.addImageTile}
                        onPress={() =>
                          pickImages(values.images.length, addImages)
                        }
                      >
                        <Text style={styles.addImagePlus}>＋</Text>
                        <Text style={styles.addImageLabel}>
                          {t('forms.addPhotos')}
                        </Text>
                        <Text
                          style={styles.addImageHint}
                        >{`${values.images.length}/6`}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {touched.images && errors.images ? (
                    <Text style={styles.errorText}>
                      {String(errors.images)}
                    </Text>
                  ) : null}
                </View>
                {/* Submit */}
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitText}>{t('forms.add')}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProductForm;

const styles = StyleSheet.create({
  formContainer: {
    paddingBottom: 50,
  },
  inputsContainer: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 8,
    paddingLeft: 10,
  },
  radioRow: { flexDirection: 'row', gap: 12, marginBottom: 8, paddingLeft: 10 },
  radioBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray3,
  },
  radioBtnActive: { backgroundColor: Colors.mein, borderColor: Colors.mein },
  radioText: { fontSize: 14, color: Colors.dark },
  radioTextActive: { color: '#fff', fontWeight: '600' },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.mein,
    borderRadius: 14,
    marginTop: 6,
    marginLeft: 10,
  },
  chipText: { fontSize: 13, color: Colors.white, fontWeight: '600' },
  label: { marginTop: 18, marginBottom: 6, fontWeight: '600', fontSize: 16 },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.gray3,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  imagesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  imageWrap: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.gray3,
  },
  image: { width: '100%', height: '100%' },
  removeImageBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  addImageTile: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  addImagePlus: { fontSize: 28, lineHeight: 28 },
  addImageLabel: { marginTop: 6, fontSize: 12, textAlign: 'center' },
  addImageHint: { marginTop: 2, fontSize: 10, opacity: 0.6 },
  submitBtn: {
    width: '90%',
    backgroundColor: Colors.mein,
    padding: 15,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: Colors.red },
  required: {
    color: Colors.red,
  },
});
