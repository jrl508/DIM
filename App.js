import "react-native-gesture-handler";
import { AuthProvider } from "./providers/AuthProvider";
import { ProjectProvider } from "./providers/ProjectProvider";
import Navigator from "./components/Navigator";

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Navigator />
      </ProjectProvider>
    </AuthProvider>
  );
}
