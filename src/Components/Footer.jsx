import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import '../Style/Footer.css';

export default function Footer() {
    return (
        <div className="footer-sec">
            <Container>
                <Row className="justify-content-between">
                    <Col xs={12} md={5} className="first-sec-footer">
                        <Navbar.Brand href="#">SPOTCKER</Navbar.Brand>
                        <p>
                            Our Company Provides You With <br />
                            The Best Technology To Help You <br />
                            Park Your Car.
                        </p>
                        <div className="social-media">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-facebook-f fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-whatsapp fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-telegram fa-lg"></i>
                            </a>
                        </div>
                    </Col>
                    <Col xs={12} md={5} className="second-sec-footer">
                        <h4>Subscribe To Our Newsletter For Updates</h4>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button">
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
