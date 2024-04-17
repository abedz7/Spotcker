import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);// רישום רכיבים נדרשים לשימוש בגרף מסוג Pie עם Chart.js

export default function Stats() {// קומפוננטה להצגת סטטיסטיקות באמצעות גרף
    const [reviewData, setReviewData] = useState({ // יצירת משתנה מצב לנתוני הגרף, המתחלק לתוויות ולנתונים של כמות כל דירוג
        labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],// תוויות לגרף
        datasets: [{// מערך של נתונים
            label: 'Review Ratings',// כותרת הנתונים בגרף
            data: [0, 0, 0, 0, 0], // התחלה עם ספירת אפסים לכל דירוג
            backgroundColor: [// צבעי רקע לכל עמודה בגרף
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [// צבעי גבול לכל עמודה
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 2// עובי הגבול של כל עמודה
        }]
    });
    const [totalReviews, setTotalReviews] = useState(0);// משתנה מצב לשמירת הספירה הכוללת של כל הביקורות

    useEffect(() => {// יצירת תוכן לשימוש ב- useEffect שיפעל כאשר הקומפוננטה תטען
        const fetchReviews = async () => {// פונקציה אסינכרונית לשליפת הנתונים
            const usersCollectionRef = collection(db, "users");// קבלת אוסף המשתמשים ממסד הנתונים
            const usersSnapshot = await getDocs(usersCollectionRef);
            const ratingCounts = [0, 0, 0, 0, 0];// מערך לספירת דירוגים

            for (const userDoc of usersSnapshot.docs) {// לולאה על כל המשתמשים
                const reviewsRef = collection(db, `users/${userDoc.id}/reviews`);// גישה לכל אוסף הביקורות של משתמש נתון
                const reviewsSnapshot = await getDocs(reviewsRef);
                reviewsSnapshot.forEach(reviewDoc => { // לולאה על כל ביקורת של המשתמש
                    const reviewData = reviewDoc.data();
                    if (reviewData.rating >= 1 && reviewData.rating <= 5) {// תנאי שבודק אם הדירוג בין 1 ל-5
                        ratingCounts[5 - reviewData.rating]++;// עדכון מערך ספירת הדירוגים
                    }
                });
            }

            setReviewData(prevData => ({// עדכון ה-state עם נתוני הדירוגים החדשים
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    data: ratingCounts
                }]
            }));
            setTotalReviews(ratingCounts.reduce((a, b) => a + b, 0));// סכום כללי של כל הביקורות
        };

        fetchReviews();// קריאה לפונקציה לביצוע השליפה
    }, []); // ה- useEffect ירוץ רק פעם אחת לאחר טעינת הקומפוננטה

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    User Reviews Statistics
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Total Reviews: {totalReviews}
                </Typography>
                <Pie data={reviewData} />
            </CardContent>
        </Card>
    );
}
