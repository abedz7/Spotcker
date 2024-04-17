import { createBrowserRouter } from 'react-router-dom';//ייבוא של כל הדפים הנדרשים
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ProfilePage from './Pages/ProfilePage';
import Users from './Pages/Users';
import StatsPage from './Pages/StatsPage';

export const routes = createBrowserRouter([// יצירת מופע של נתיבים עבור האפליקציה
    { path: '/', element: <Home /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/SignIn', element: <SignIn /> },
    { path: '/Profile', element: <ProfilePage /> } ,
    { path: '/Users' , element: <Users />},
    { path: '/StatsPage', element: <StatsPage />}
]);