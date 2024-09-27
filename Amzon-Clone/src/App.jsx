import { useEffect, useContext } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./components/DataProvider/DataProvider";
import { type } from "./utils/action.type";
import { auth } from "./utils/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  console.log("Current user:", user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("User logged in:", authUser);
        dispatch({
          type: type.SET_USER,
          user: authUser,
        });
      } else {
        console.log("No user logged in");
        dispatch({
          type: type.SET_USER,
          user: null,
        });
      }
    });

   
    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
