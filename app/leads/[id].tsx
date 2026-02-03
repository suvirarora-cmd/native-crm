import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLead, updateLeadStatus } from '../../api/Leads'; 
import { Lead } from '../../common/types/Lead';

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    console.log("Navigated to Lead Detail with ID:", id);
    if (id) {
      fetchLeadDetails();
    }
  }, [id]);

  const fetchLeadDetails = async () => {
    try {
      const data = await getLead(id as string);
      console.log("Fetched Lead Data:", data);
      setLead(data);
    } catch (error) {
      console.error('Error fetching lead:', error);
      Alert.alert('Error', 'Could not load lead details. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!lead) return;
    
    setUpdating(true);
    try {
      console.log(`Updating status to: ${newStatus}...`); 
      
      const updatedLead = await updateLeadStatus(lead._id, newStatus);
      
      setLead(updatedLead); 
      Alert.alert('Success', `Status updated to ${newStatus}`);
    } catch (error: any) {
      console.error("Update failed:", error);
      const msg = error.response?.data?.message || 'Failed to update status';
      
      Alert.alert('Update Failed', Array.isArray(msg) ? msg.join('\n') : msg);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={{ marginTop: 10 }}>Loading Lead...</Text>
      </View>
    );
  }

  if (!lead) {
    return (
      <View style={styles.center}>
        <Text>Lead not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#2563EB' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderStatusBtn = (status: string, label: string) => {
    const isActive = lead.status === status;
    return (
      <TouchableOpacity 
        style={[
          styles.statusBtn, 
          isActive ? styles.activeBtn : styles.inactiveBtn,
          updating && styles.disabledBtn
        ]}
        onPress={() => handleStatusUpdate(status)}
        disabled={isActive || updating}
      >
        <Text style={[styles.btnText, isActive ? styles.activeText : styles.inactiveText]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Leads</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.detail}>{lead.email}</Text>
          <Text style={styles.detail}>{lead.phone}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{lead.status.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusGrid}>
          {renderStatusBtn('new', 'New')}
          {renderStatusBtn('contacted', 'Contacted')}
          {renderStatusBtn('interested', 'Interested')}
          {renderStatusBtn('converted', 'Converted')}
        </View>

        <Text style={{ marginTop: 20, color: '#6B7280', fontSize: 12 }}>
          * Ensure you follow the workflow order (New → Contacted → Interested → Converted)
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  backButton: { marginBottom: 20 },
  backText: { color: '#2563EB', fontSize: 16 },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#111827' },
  detail: { fontSize: 16, color: '#4B5563', marginBottom: 4 },
  badge: { 
    marginTop: 12, 
    backgroundColor: '#EFF6FF', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20 
  },
  badgeText: { color: '#2563EB', fontWeight: 'bold', fontSize: 12 },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#111827' },
  
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statusBtn: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    minWidth: '45%',
  },
  activeBtn: { backgroundColor: '#DBEAFE', borderColor: '#2563EB' },
  inactiveBtn: { backgroundColor: 'white', borderColor: '#D1D5DB' },
  disabledBtn: { opacity: 0.5 },
  
  btnText: { fontWeight: '600' },
  activeText: { color: '#1E40AF' },
  inactiveText: { color: '#374151' },
});