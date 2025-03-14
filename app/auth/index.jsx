import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const AuthScreen = () => {
  const { login, register } = useAuth(); //* login and register are provided to the app component by the auth context
  const router = useRouter();
  // MARK: State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); //* this will be login by default.
  const [error, setError] = useState(false);

  // MARK: Functions
  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    let response; // initialize the response variable
    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }
    // if (response?.error) {
    //   console.log('Error', response.error);
    //   Alert.alert('Error', response.error);
    //   return;
    // }
    if (response?.error) {
      if (Platform.OS == 'web') {
        window.alert('Error, invalid credentials ');
        console.log('Error', response.error);
      } else {
        Alert.alert('Error', response.error);
      }
      return;
    }
    router.replace('/notes');
  };
  // MARK: JSX
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email} //state
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password} //state
        onChangeText={setPassword}
        secureTextEntry
        textContentType="none"
      />
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword} //state
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="none"
        />
      )}
      {/* MARK: Buttons */}
      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>
          {isRegistering ? 'Sign Up' : 'Log In'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//MARK: Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AuthScreen;
