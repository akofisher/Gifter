import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const KEY = "app_device_id";

export async function getDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(KEY);
  if (existing) return existing;

  const id = uuidv4();
  await AsyncStorage.setItem(KEY, id);
  return id;
}
