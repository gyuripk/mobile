import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../styles/global";
import { GlobalLayout } from "../components/Layout";

const licenses = require("../assets/mobile-licenses.json");

const AboutScreen = () => {
  const globalStyles = GlobalStyles();
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    setLicenseData(Object.entries(licenses));
  }, []);

  return (
    <GlobalLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, globalStyles.text]}>About</Text>
        <Text style={[styles.description, globalStyles.text]}>
          This application is designed to help users manage their notes
          efficiently. Users can create, edit, and delete notes. The application
          provides a simple and intuitive interface to keep track of important
          information and tasks.
        </Text>
        <Text style={[styles.title, globalStyles.text]}>Licenses</Text>
        {licenseData.map(([packageName, licenseInfo]) => (
          <View key={packageName} style={styles.licenseItem}>
            <Text style={[styles.packageName, globalStyles.text]}>
              {packageName}
            </Text>
            <Text style={[styles.licenseText, globalStyles.text]}>
              License: {licenseInfo.licenses}
            </Text>
            <Text style={[styles.licenseText, globalStyles.text]}>
              Repository: {licenseInfo.repository}
            </Text>
            <Text style={[styles.licenseText, globalStyles.text]}>
              License URL: {licenseInfo.licenseUrl}
            </Text>
          </View>
        ))}
      </ScrollView>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  licenseItem: {
    marginBottom: 16,
  },
  packageName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  licenseText: {
    fontSize: 16,
  },
});

export default AboutScreen;
