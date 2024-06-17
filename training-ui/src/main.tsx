import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode.tsx";
import routes from "./routes/routes.tsx";
import { AppProvider } from "./AppContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider>
            <ToggleColorMode>
                <RouterProvider router={routes}/>
            </ToggleColorMode>
        </AppProvider>
    </React.StrictMode>,
)
