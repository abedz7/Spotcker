import React, { useState , useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { CardHeader, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Rating from '@mui/material/Rating';
import { auth, db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarRateIcon from '@mui/icons-material/StarRate'; 
import ReviewsIcon from '@mui/icons-material/Reviews'; 
import { query, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


function stringAvatar(firstName, lastName) {// פונקציה ליצירת אבטר על בסיס שם פרטי ושם משפחה
  firstName = firstName || "";// בדיקה אם הפרמטרים ריקים והחזרת ערך ברירת מחדל
  lastName = lastName || "";
  const initials = `${firstName[0] || 'U'}${lastName[0] || 'U'}`;// יצירת מיתוג מראשי התווים הראשונים של שם הפרטי ושם המשפחה
  return {
    sx: {
      bgcolor: stringToColor(firstName + ' ' + lastName),// קביעת צבע הרקע בהתאם לשם
      width: 56,
      height: 56,
    },
    children: initials.toUpperCase(), // הצגת האותיות הראשונות באותיות רישיות
  };
}

// פונקציה ליצירת צבע על בסיס מחרוזת
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {  // חישוב ערך האש על בסיס קודי התווים במחרוזת
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {// יצירת מחרוזת צבע בפורמט hex על בסיס ערך האש
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;// החזרת צבע בפורמט hex
}

const ProfileCard = ({ user }) => {
  const [open, setOpen] = useState(false);// משתנה סטייט לניהול פתיחת/סגירת דיאלוג
  const [rating, setRating] = useState(0);// משתנה סטייט לשמירת הדירוג שהמשתמש נתן
  const [review, setReview] = useState('');// משתנה סטייט לשמירת טקסט הביקורת שהמשתמש כתב
  const [reviews, setReviews] = useState([]);// מערך סטייט לשמירת כל הביקורות של המשתמש
  const [reviewsDialogOpen, setReviewsDialogOpen] = useState(false);// משתנה סטייט לניהול פתיחת/סגירת דיאלוג של הביקורות

  
  const handleReviewsDialogOpen = () => setReviewsDialogOpen(true);// פתיחת דיאלוג של הביקורות
  const handleReviewsDialogClose = () => setReviewsDialogOpen(false);// סגירת דיאלוג של הביקורות


  useEffect(() => {
    const fetchReviews = async () => { // פונקציה אסינכרונית לטעינת ביקורות
      if (auth.currentUser) { // בדיקה אם יש משתמש מחובר
        const q = query(collection(db, `users/${auth.currentUser.uid}/reviews`));// יצירת שאילתא לאיסוף ביקורות מתוך הפיירסטור
        const querySnapshot = await getDocs(q);// ביצוע השאילתא וקבלת הנתונים
        const fetchedReviews = [];
        querySnapshot.forEach((doc) => {// עובר על כל המסמכים שהוחזרו ושמירתם במערך
          fetchedReviews.push(doc.data());
        });
        setReviews(fetchedReviews);// עדכון מצב הביקורות במערך הביקורות
      }
    };

    fetchReviews();// קריאה לפונקציה לטעינת הביקורות
  }, []);// הוספת תלות במערך ריק כדי שהפונקציה תרוץ רק פעם אחת אחרי העלאת הקומפוננטה

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReview = async () => {
    if (!auth.currentUser) {
        console.error("No authenticated user available for submitting review.");
        return;
    }

    const reviewRef = collection(db, `users/${auth.currentUser.uid}/reviews`);// יצירת קישור לאוסף ביקורות של המשתמש הנוכחי ב-Firestore
    const reviewData = {// יצירת נתוני הביקורת
        rating: rating,// הדירוג
        review: review,// טקסט הביקורת
        createdAt: new Date()// תאריך ושעה של יצירת הביקורת
    };

    try {
        const docRef = await addDoc(reviewRef, reviewData);  // שמירת הביקורת ב-Firestore וקבלת מזהה המסמך
        console.log("Review submitted successfully");

        
        const newReview = { // יצירת אובייקט ביקורת חדש כולל המזהה מ-Firestore
            id: docRef.id,  // קבלת מזהה המסמך החדש
            ...reviewData// הכללת נתוני הביקורת
        };

        
        setReviews(prevReviews => [...prevReviews, newReview]); // עדכון מערך הביקורות במצב כדי לכלול את הביקורת החדשה

        handleClose();  // סגירת דיאלוג ההוספה
    } catch (error) {
        console.error("Error submitting review:", error);
    }
};
  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
      </div>
  );
  }

  return (// רינדור של כרטיסיית הפרופיל עם תוכן משתמש
    <Card sx={{ maxWidth: 1000, m: 'auto', mt: 5, borderRadius: '16px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)', bgcolor: 'background.default' }}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(user.firstName, user.lastName)} />}
        title={<Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#3f51b5' }}>{`${user.firstName || 'No First Name'} ${user.lastName || 'No Last Name'}`}</Typography>}
        subheader={<Typography variant="subtitle1" style={{ color: 'black' }}>{user.email || 'No Email Provided'}</Typography>}
        action={user.isAdmin ? (
          <Box sx={{ display: 'flex', color: 'green' }}>
            <AdminPanelSettingsIcon />
            <Typography variant="subtitle1">Admin</Typography>
          </Box>
        ) : null}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon color="black" />
          <Typography variant="body1" color="text.secondary" style={{ color: 'black', fontSize: '1.1rem' }}>{user.phoneNumber || 'No Phone Number'}</Typography>
        </Box>
        <Box sx={{
          mt: 2,
          p: 1,
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '10px',
          border: '1px solid black',
          bgcolor: 'yellow',
          fontWeight: 'bold',
          minWidth: '30%',
          maxWidth: '30%',
        }}>
          <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
            {user.carPlateNumber || 'No Car Plate Number'}
          </Typography>
          {user.hasDisabilityCertificate && (
            <AccessibleForwardIcon sx={{ color: '#3f51b5' }} />
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="medium" variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Review
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogContent>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
            />
            <TextField
              autoFocus
              margin="dense"
              id="review"
              label="Your Experience"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              minRows={4}
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </DialogActions>
        </Dialog>
        <Button size="medium" variant="contained" color="primary" startIcon={<ReviewsIcon />} onClick={handleReviewsDialogOpen}>
          Reviews
        </Button>
        <Dialog open={reviewsDialogOpen} onClose={handleReviewsDialogClose}>
          <DialogTitle> {user.firstName || 'No First Name'}'s Reviews</DialogTitle>
          <DialogContent>
            <List>
              {reviews.map((review, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarRateIcon style={{color:'gold'}} />
                  </ListItemIcon>
                  <ListItemText  primary={`${review.rating} Stars`} secondary={review.review}/>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReviewsDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
        {user.isAdmin && (
          <Box>
            <Link to={`/Users/`} >
            <Button style={{ marginRight: '10px' }} size="medium" variant="contained" color="secondary" startIcon={<PeopleIcon />}>Users</Button>
            </Link>
           <Link to={`/StatsPage/`} >
           <Button style={{ marginRight: '10px' }} size="medium" variant="contained" color="secondary" startIcon={<InsightsIcon />}>Stats</Button>
           </Link>
            
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
