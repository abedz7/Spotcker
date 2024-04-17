import React from 'react';
import { Card } from 'react-bootstrap';
import prking2 from '../assets/images/prking2.png'; 
import prking from '../assets/images/prking.png'; 
import prking3 from '../assets/images/prking3.jpg'; 
import '../Style/Content.css';

export default function Content() {
  return (
    <div className="content d-flex flex-column align-items-center">
      <div className="content-section d-flex align-items-center flex-column flex-md-row">
        <Card className="content-card mb-3 mb-md-0" border="secondary">
          <Card.Header>Easy Parking Finder</Card.Header>
          <Card.Body>
            <Card.Title>Discover Nearby Parking</Card.Title>
            <Card.Text>
              Quickly locate available parking spots in real-time near your destination, saving you time and reducing traffic.
            </Card.Text>
          </Card.Body>
        </Card>
        <img src={prking2} alt="Parking" className="content-image"/>
      </div>
      <div className="content-section d-flex align-items-center flex-column-reverse flex-md-row">
        <img src={prking} alt="Parking" className="content-image"/>
        <Card className="content-card" border="secondary">
          <Card.Header>Smart Navigation</Card.Header>
          <Card.Body>
            <Card.Title>Guided GPS Routes</Card.Title>
            <Card.Text>
              Use GPS guided directions to take the most efficient route to your parking spot without the hassle of searching.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="content-section d-flex align-items-center flex-column flex-md-row">
        <Card className="content-card mb-3 mb-md-0" border="secondary">
          <Card.Header>Parking History</Card.Header>
          <Card.Body>
            <Card.Title>Track Your Parking Activity</Card.Title>
            <Card.Text>
              Keep a history of all your parking locations and durations, useful for managing expenses and remembering parking spots.
            </Card.Text>
          </Card.Body>
        </Card>
        <img src={prking3} alt="Parking" className="content-image"/>
      </div>
    </div>
  );
}
