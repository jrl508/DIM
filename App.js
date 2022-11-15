import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './providers/AuthProvider';
import Navigator from './components/Navigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
        <Navigator />
    </AuthProvider>
  );
}
