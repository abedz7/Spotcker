import React, { useState } from 'react';
import { FloatingLabel, Row, Col, Button, Form, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/SignUp.css';
import { auth, db } from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SignUpCard() {
    const [formData, setFormData] = useState({ // יצירת משתני מצב עבור נתוני הטופס ושגיאות הודעה
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        carPlateNumber: ''

    });
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        phoneNumber: false,
        carPlateNumber: false
    });
    const [checked, setChecked] = useState(false);// משתנה לבדיקת תיבת סימון
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {// פונקציה שמטפלת בשליחת הטופס
        event.preventDefault(); // מניעת שליחת הטופס באופן דיפולטיבי

        // בדיקה אם יש שגיאות בטופס
        const errors = Object.values(formErrors).some(error => error);

        if (!errors) {// אם אין שגיאות, ניתן להמשיך עם הרשמה
            try {// יצירת משתמש חדש ב-Firebase Auth עם אימייל וסיסמה

                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;


                await setDoc(doc(db, "users", user.uid), {// הוספת מסמך חדש לאוסף "users" ב-Firestore עם פרטי המשתמש
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    carPlateNumber: formData.carPlateNumber,
                    hasDisabilityCertificate: checked,
                    isAdmin: false
                });

                setShowAlert(true); 
                setTimeout(() => {
                    setShowAlert(false); 
                    navigate('/SignIn'); 
                }, 5000);
            } catch (error) {
                setErrorMessage(`Error in registration: ${error.message}`);
                setTimeout(() => setErrorMessage(''), 5000); 
            }
        } else {
            setErrorMessage("Please correct the errors in the form.");
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    const handleChange = (field, value) => {// פונקציה שמטפלת בשינויים של ערכים בשדות הטופס
        setFormData(prev => ({ ...prev, [field]: value }));// עדכון ערכי הטופס תוך שמירה על ערכים קודמים ועדכון השדה הרלוונטי

        let isValid = true;// בדיקות תקינות לכל שדה בטופס
        switch (field) {
            case 'email':// בדיקת תקינות לאימייל
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'password':// בדיקת תקינות לסיסמה
                isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).+$/.test(value);
                break;
            case 'phoneNumber':// בדיקת תקינות למספר טלפון
                isValid = /^05[01234578]-\d{3}-\d{4}$/.test(value);
                break;
            case 'carPlateNumber':// בדיקת תקינות למספר רישוי
                isValid = /^(?:\d{2}-\d{3}-\d{2}|\d{3}-\d{2}-\d{3})$/.test(value);
                break;
            default:
                break;
        }
        setFormErrors(prev => ({ ...prev, [field]: !isValid }));// עדכון רשימת שגיאות בהתאם לתוצאות בדיקת התקינות
    };

    return (
        <div className="sign-up-container">

            <div className="sign-up-form-container">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h2>Join Our Community</h2>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInputFirstName" label="First Name" className="mb-3">
                                <Form.Control
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={e => handleChange('firstName', e.target.value)}
                                    isInvalid={formErrors.firstName}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInputLastName" label="Last Name" className="mb-3">
                                <Form.Control
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={e => handleChange('lastName', e.target.value)}
                                    isInvalid={formErrors.lastName}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                            isInvalid={formErrors.email}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={e => handleChange('password', e.target.value)}
                            isInvalid={formErrors.password}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number" className="mb-3">
                        <Form.Control
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={e => handleChange('phoneNumber', e.target.value)}
                            isInvalid={formErrors.phoneNumber}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingCarPlateNumber" label="Car Plate Number" className="mb-3">
                        <Form.Control
                            placeholder="Car Plate Number"
                            value={formData.carPlateNumber}
                            onChange={e => handleChange('carPlateNumber', e.target.value)}
                            isInvalid={formErrors.carPlateNumber}
                        />
                    </FloatingLabel>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>Do you have a disabled Certificate?</p>
                        <ToggleButton
                            style={{ marginLeft: '20px', height: '40px', marginTop: '10px' }}
                            className="mb-2"
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-primary"
                            checked={checked}
                            value="1"
                            onChange={(e) => setChecked(e.currentTarget.checked)}
                        >
                            ✔
                        </ToggleButton>
                    </div>
                    <p>Already Have An Account?
                        <Link to={`/SignIn/`}>
                            Sign In
                        </Link>
                    </p>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Button type="submit" variant="primary">Sign Up</Button>{' '}
                        </Col>
                    </Row>
                </Form>
                {showAlert && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        User Registered Successfully!
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
}
