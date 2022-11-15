import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './providers/AuthProvider';
import Navigator from './Navigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
        <Navigator />
    </AuthProvider>
  );
}
