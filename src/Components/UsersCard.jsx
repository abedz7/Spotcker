import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function UsersCard() {// פונקציה לטיפול במשתמשים
    const [users, setUsers] = useState([]); // יצירת משתני מצב לשמירת רשימת המשתמשים ומידע נוסף לעריכה
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        email: '',
        phoneNumber: '',
        hasDisabilityCertificate: false,
        carPlateNumber: ''
    });

    useEffect(() => {// useEffect שמתבצע בעת טעינת הקומפוננטה
        const fetchUsers = async () => {// פונקציה אסינכרונית לשליפת מידע מהמסד נתונים
            const usersCollectionRef = collection(db, "users");// הגדרת המקור לשליפת המידע
            const q = query(usersCollectionRef, where("isAdmin", "==", false));// יצירת שאילתה למציאת משתמשים שאינם מנהלים
            const querySnapshot = await getDocs(q);// ביצוע השאילתה וקבלת תוצאות
            const userList = querySnapshot.docs.map(doc => ({// עיבוד תוצאות השאילתה ויצירת רשימת משתמשים
                id: doc.id,// זיהוי ייחודי של המשתמש
                ...doc.data()// פרטי המשתמש
            }));
            setUsers(userList);// עדכון משתנה המצב של המשתמשים בנתונים שנשלפו
        };

        fetchUsers();// קריאה לפונקציה לשליפת המשתמשים
    }, []);// ה- useEffect יפעל פעם אחת לאחר טעינת הקומפוננטה

    const handleEditClick = (user) => {// פונקציה לטיפול בלחיצה על כפתור עריכה
        setEditUserId(user.id);// שמירת זיהוי המשתמש לעריכה
        setEditFormData({// הגדרת נתוני המשתמש לעריכה בטופס
            email: user.email,
            phoneNumber: user.phoneNumber,
            hasDisabilityCertificate: user.hasDisabilityCertificate,
            carPlateNumber: user.carPlateNumber
        });
    };

    const handleCancelClick = () => {// פונקציה לטיפול בלחיצה על כפתור ביטול
        setEditUserId(null);// מחיקת הזיהוי של המשתמש מהמצב של עריכה
    };

    const handleSaveClick = async () => {// פונקציה לטיפול בלחיצה על כפתור שמירה
        const userLink = doc(db, "users", editUserId);// יצירת קישור למסמך המשתמש במסד הנתונים
        await updateDoc(userLink, editFormData);// עדכון המסמך עם הנתונים מהטופס
        const updatedUsers = users.map((user) => (user.id === editUserId ? { ...user, ...editFormData } : user));// עדכון המסמך עם הנתונים מהטופס
        setUsers(updatedUsers);
        setEditUserId(null); // איפוס הזיהוי של המשתמש מהמצב של עריכה
    };

    const handleDeleteClick = async (userId) => {// פונקציה לטיפול בלחיצה על כפתור מחיקה
        const userLink = doc(db, "users", userId);// יצירת קישור למסמך המשתמש במסד הנתונים
        await deleteDoc(userLink);// מחיקת המסמך מהמסד נתונים
        const updatedUsers = users.filter((user) => user.id !== userId);// עדכון המערך של המשתמשים לאחר המחיקה
        setUsers(updatedUsers);
    };

    return (
        <Card sx={{ margin: 2 }}> 
            <CardContent>
                <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                    Users List
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Disabled</TableCell>
                                <TableCell>Plate Number</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.firstName} {user.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {editUserId === user.id ? <TextField size="small" value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} /> : user.email}
                                    </TableCell>
                                    <TableCell>
                                        {editUserId === user.id ? <TextField size="small" value={editFormData.phoneNumber} onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })} /> : user.phoneNumber}
                                    </TableCell>
                                    <TableCell>
                                        {editUserId === user.id ? <TextField size="small" value={editFormData.hasDisabilityCertificate} onChange={(e) => setEditFormData({ ...editFormData, hasDisabilityCertificate: e.target.checked })} type="checkbox" checked={editFormData.hasDisabilityCertificate} /> : (user.hasDisabilityCertificate ? "Yes" : "No")}
                                    </TableCell>
                                    <TableCell>
                                        {editUserId === user.id ? <TextField size="small" value={editFormData.carPlateNumber} onChange={(e) => setEditFormData({ ...editFormData, carPlateNumber: e.target.value })} /> : user.carPlateNumber}
                                    </TableCell>
                                    <TableCell>
                                        {editUserId === user.id ? (
                                            <div>
                                                <IconButton onClick={handleSaveClick}><SaveIcon color="primary" /></IconButton>
                                                <IconButton onClick={handleCancelClick}><CancelIcon color="secondary" /></IconButton>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton onClick={() => handleEditClick(user)}><EditIcon /></IconButton>
                                                <IconButton onClick={() => handleDeleteClick(user.id)}><DeleteIcon /></IconButton>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
