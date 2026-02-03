import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { SessionItem } from '../../Services/api/auth/auth.service';
import { authService } from '../../Services/api/auth/auth.service';
import { getDeviceId } from '../../Services/device/deviceId';
import { clearSession } from '../../Store/Slices/AuthSlice';
import { useAppDispatch } from '../../Store/store';

const formatDate = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
};

const shortUA = (ua?: string) => {
  if (!ua) return 'Unknown device';
  if (ua.length <= 70) return ua;
  return ua.slice(0, 70) + '…';
};

const DevicesScreen: React.FC = () => {
  const [myDeviceId, setMyDeviceId] = useState<string>('');
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const loadDeviceId = useCallback(async () => {
    const id = await getDeviceId();
    setMyDeviceId(id);
  }, []);

  const fetchSessions = useCallback(async () => {
    const res = await authService.sessions();
    setSessions(res.sessions ?? []);
  }, []);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await loadDeviceId();
      await fetchSessions();
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.response?.data?.message || e?.message || 'Failed to load sessions',
      );
    } finally {
      setLoading(false);
    }
  }, [fetchSessions, loadDeviceId]);

  useEffect(() => {
    init();
  }, [init]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchSessions();
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.response?.data?.message ||
          e?.message ||
          'Failed to refresh sessions',
      );
    } finally {
      setRefreshing(false);
    }
  }, [fetchSessions]);

  const currentSession = useMemo(() => {
    if (!myDeviceId) return null;
    return sessions.find(s => s.deviceId === myDeviceId) ?? null;
  }, [sessions, myDeviceId]);

  const handleRevoke = useCallback(
    (session: SessionItem) => {
      const isThisDevice = session.deviceId === myDeviceId;

      Alert.alert(
        'Logout device?',
        isThisDevice
          ? 'This will log you out on this phone.'
          : 'This will log out that device. If it wasn’t you, do it now.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                setBusyId(session.id);
                await authService.revokeSession(session.id);

                // ✅ If revoked THIS device → immediately logout in UI
                if (isThisDevice) {
                  dispatch(clearSession());
                  return;
                }

                // ✅ Otherwise just refresh list
                await fetchSessions();
              } catch (e: any) {
                Alert.alert(
                  'Error',
                  e?.response?.data?.message ||
                    e?.message ||
                    'Failed to revoke session',
                );
              } finally {
                setBusyId(null);
              }
            },
          },
        ],
      );
    },
    [dispatch, fetchSessions, myDeviceId],
  );

  const handleLogoutAll = useCallback(() => {
    Alert.alert(
      'Logout all devices?',
      'This will log you out from every device, including this one.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout all',
          style: 'destructive',
          onPress: async () => {
            try {
              setBusyId('logout-all');
              await authService.logoutAll();
              dispatch(clearSession()); // ✅ instant UI logout
            } catch (e: any) {
              Alert.alert(
                'Error',
                e?.response?.data?.message ||
                  e?.message ||
                  'Failed to logout all devices',
              );
            } finally {
              setBusyId(null);
            }
          },
        },
      ],
    );
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: SessionItem }) => {
      const isThisDevice = item.deviceId === myDeviceId;

      return (
        <View style={[styles.card, isThisDevice && styles.cardActive]}>
          <View style={styles.rowBetween}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text style={styles.title}>
                {isThisDevice ? 'This device' : 'Device'}
              </Text>

              {isThisDevice && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Connected</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => handleRevoke(item)}
              disabled={busyId === item.id}
              style={[
                styles.btnSmall,
                busyId === item.id && styles.btnDisabled,
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.btnSmallText}>
                {busyId === item.id ? '...' : 'Logout'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sub}>{shortUA(item.userAgent)}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>IP: {item.ip || '-'}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              Created: {formatDate(item.createdAt)}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              Last active: {formatDate(item.lastUsedAt)}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              Expires: {formatDate(item.expiresAt)}
            </Text>
          </View>
        </View>
      );
    },
    [busyId, handleRevoke, myDeviceId],
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading devices…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h1}>Devices</Text>

        <TouchableOpacity
          onPress={handleLogoutAll}
          disabled={busyId === 'logout-all'}
          style={[styles.btn, busyId === 'logout-all' && styles.btnDisabled]}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {busyId === 'logout-all' ? '...' : 'Logout all'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        {currentSession
          ? `You’re logged in on ${sessions.length} device(s).`
          : 'Could not detect “this device”. (DeviceId not set yet)'}
      </Text>

      <FlatList<SessionItem>
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No active sessions found.</Text>
          </View>
        }
      />
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h1: { fontSize: 22, fontWeight: '700' },
  note: { marginTop: 8, marginBottom: 12, opacity: 0.8 },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardActive: {
    borderColor: '#111',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { fontSize: 16, fontWeight: '700' },
  sub: { marginTop: 6, opacity: 0.85 },
  metaRow: { marginTop: 4 },
  meta: { fontSize: 12, opacity: 0.75 },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#111',
  },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '700' },

  btn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#111',
  },
  btnText: { color: 'white', fontWeight: '700' },

  btnSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#111',
  },
  btnSmallText: { color: 'white', fontWeight: '700' },

  btnDisabled: { opacity: 0.5 },
});
