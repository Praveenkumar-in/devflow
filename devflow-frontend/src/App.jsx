import { Toaster } from "react-hot-toast";

import AnimatedBackground from "./components/Background";

import AppRoutes from "./routes/AppRoutes";

function App() {

    return (

        <>

            <AnimatedBackground />

            <Toaster
                position="top-right"
            />

            <AppRoutes />

        </>

    );

}

export default App;