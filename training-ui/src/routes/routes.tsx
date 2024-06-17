import {createBrowserRouter, Navigate} from "react-router-dom";
import MembersPage from "../components/pages/MembersPage.tsx";
import TeamPage from "../components/pages/TeamPage.tsx";
import TeamsPage from "../components/pages/TeamsPage.tsx";
import Layout from "../Layout.tsx";
import MemberPage from "../components/pages/MemberPage.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <Navigate to={"/teams"} />
            },
            {
                path: "teams", element: <TeamsPage />
            },
            {
                path: "teams/:teamName", element: <TeamPage />
            },
            {
                path: "members", element: <MembersPage />
            },
            {
                path: "members/:lastName", element: <MemberPage />
            }
        ]
    }
])

export default routes;