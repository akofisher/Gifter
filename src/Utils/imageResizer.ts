import ImageResizer from '@bam.tech/react-native-image-resizer';

export async function prepareAvatar(uri: string) {
  // 512x512 is perfect for avatars
  const resized = await ImageResizer.createResizedImage(
    uri,
    512,
    512,
    'JPEG',
    80,   // quality 0-100
    0     // rotation
  );

  return {
    uri: resized.uri,
    name: resized.name || 'avatar.jpg',
    type: 'image/jpeg',
  };
}
