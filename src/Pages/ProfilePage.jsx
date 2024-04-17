import { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import ProfileCard from '../Components/ProfileCard';
import CircularProgress from '@mui/material/CircularProgress';



export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);// יצירת משתנה סטייט לאחסון נתוני הפרופיל, עם ערך התחלתי null

  useEffect(() => {// useEffect להפעלת קוד בעת טעינת הקומפוננטה
    if (auth.currentUser) {// בדיקה אם יש משתמש מחובר במערכת Firebase Auth
      const documentRef = doc(db, "users", auth.currentUser.uid);
      const fetchUserData = async () => {// פונקציה אסינכרונית לטעינת נתוני המשתמש
        try {
          const docSnap = await getDoc(documentRef);// ניסיון לקבלת המסמך של המשתמש
          if (docSnap.exists()) {// אם המסמך קיים, הצגת נתוני המשתמש בסטייט
            setProfileData(docSnap.data());
          } else {
            setProfileData(null);// אם המסמך לא קיים, הצגת null בסטייט
          }
        } catch (error) { // במקרה של כישלון בקריאה, השארת הסטייט כ-null (אפשר גם להוסיף טיפול בשגיאה)
        }
      };
  
      fetchUserData();// קריאה לפונקציה שטוענת את נתוני המשתמש
    } else {
      setProfileData(null);// אם אין משתמש מחובר, הצגת null בסטייט
    }
  }, []);// ה-array הריק מבטיח שהקוד ירוץ רק פעם אחת אחרי הרינדור הראשון

  if (!profileData) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    );
}

  return (
    <div>
      <ProfileCard user={profileData} />
    </div>
  );
}
