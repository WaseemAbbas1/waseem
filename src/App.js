import "bootstrap/dist/js/bootstrap.bundle"
import './App.scss';
import "./scss/_loader.scss"

import Loader from "./components/Loader"
import Routes from "./pages/Routes"
import { useAuthContext, } from "context/AuthContext";
function App() {
  const {isLoading } = useAuthContext()
  return (
    <>{isLoading
      ?<Loader/>
      :<Routes/>
    }
      
    
    </>
  );
}

export default App;
