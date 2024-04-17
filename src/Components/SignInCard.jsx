import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../Style/SignIn.css';

export default function SignInCard() {
  const [email, setEmail] = useState('');// מדיניות לניהול האימייל, הסיסמה והשגיאות
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();// הוק לניווט בין דפים

  const handleSignIn = async (event) => {// פונקציה שמטפלת בהתחברות כאשר לוחצים על כפתור ההתחברות
    event.preventDefault();// מונעת רענון דף סטנדרטי בטופס
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// בדיקת תקינות כתובת אימייל
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');// הצגת שגיאה אם האימייל לא תקין
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/Profile'); // ניווט לדף הפרופיל במקרה של התחברות מוצלחת
    } catch (error) {
      setError('Failed to sign in. Please check your email and password.');// הצגת הודעת שגיאה בממשק
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h1>Sign In To Your Account</h1>
        <Form onSubmit={handleSignIn}>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FloatingLabel>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>Dont Have An Account Yet ? 
            <Link to={`/SignUp/`}>
              Sign Up
            </Link>
          </p>
          <Row className="justify-content-center"> 
            <Col xs="auto">
              <Button variant="primary" type="submit">Sign In</Button>{' '}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
