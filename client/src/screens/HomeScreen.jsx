// Dependencies
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBuilding,
  FaDollarSign,
  FaPhone,
  FaHeadset,
  FaSearch,
  FaShippingFast,
  FaEnvelopeOpenText,
} from "react-icons/fa";

// Actions
import { subscribe } from "redux/actions/newsletter";

// CSS
import "./HomeScreen.css";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, success, newsletter, error } = useSelector((state) => state.newsletter);

  return (
    <div>
      <div className="landing">
        <img src="/assets/images/veterinary-care.jpg" alt="Cat looking" />
        <div className="content">
          <h1 className="pb-4">Welcome to Petohub</h1>
          <h2 className="pb-4">BEST PET LOVERS COMMUNITY</h2>
          <div className="search-wrap">
            <form>
              <div className="search-box mx-auto">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  className="input"
                  placeholder="What are you looking for?"
                />
                <button
                  className="search-button px-3"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/shop/search/${search}`);
                  }}
                >
                  <FaSearch size={23} /> <span> Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Container>
        <Row className="my-4">
          <Col xs={12} md={6} className="our-company-section">
            <h3 className="gradient-heading">Our Company</h3>
            <p>
              We provide specialised and personalised care catered for your and your pet's needs in
              a fast and reliable manner.
            </p>
            <p>
              You can choose from various top brands and professionals to give your pets the care
              they deserve. Our company aims to make sure that your pet is taken care of in the best
              possible way.
            </p>
            <Row className="text-center mt-2">
              <Col xs={12} sm={6} className="px-3">
                <FaBuilding />
                <h5 className="my-3 gradient-heading">Our Office</h5>
                <p>Mukhram Garden, Tilak Nagar, New Delhi, 110018</p>
              </Col>
              <Col xs={12} sm={6} className="px-3">
                <FaPhone />
                <h5 className="my-3 gradient-heading">Our Contact</h5>
                <p style={{ wordWrap: "break-word" }}>
                  (+91) 7011923045 <br /> petohubofficial@gmail.com
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} className="px-4 our-company-images">
            <Row className="text-center">
              <Col>
                <img src="assets/images/our-company-1.jpg" alt="" />
              </Col>
              <Col>
                <img src="assets/images/our-company-2.jpg" alt="" />
              </Col>
              <Col>
                <img src="assets/images/our-company-3.jpg" alt="" />
              </Col>
              <Col>
                <img src="assets/images/our-company-4.jpg" alt="" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <section className="about-section py-2">
        <Container className="d-flex align-items-center justify-content-center flex-column">
          <h3 className="gradient-heading">About Us</h3>
          <h2 className="gradient-heading">Why choose us?</h2>
          <Row>
            <Col sm={12} md={6}>
              <div className="about-section-image py-2">
                <img src="/assets/images/about-section.png" alt="" />
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className="about-section-content py-2">
                <h4>Best products in the country</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti
                  corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod
                  reprehenderit rem? Tempora aut soluta odio corporis nihil!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro
                  illo eos cumque deleniti iste alias, eum natus.
                </p>
                <div className="d-flex justify-content-between text-center">
                  <div className="icons">
                    <FaShippingFast />
                    <span>Free delivery</span>
                  </div>
                  <div className="icons">
                    <FaDollarSign />
                    <span>Easy payments</span>
                  </div>
                  <div className="icons">
                    <FaHeadset />
                    <span>24/7 Service</span>
                  </div>
                </div>
                <button className="about-button my-2">Learn more</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="newsletter">
        <img src="/assets/images/newsletter.jpg" alt="Dog looking" />
        <Container className="content">
          <h3>Subscribe For New Features</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sed aliquam quibusdam
            neque magni magnam est laborum doloribus, facere dolores.
          </p>
          <div style={{ fontSize: "1.2rem" }}>
            {success && <p>{newsletter?.email} succesfully subscribed</p>}
            {error && <p>{error}</p>}
          </div>
          <form action="">
            <div className="search-wrap">
              <div className="search-box mx-auto">
                <input
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  className="input"
                  placeholder="Enter your email"
                />
                <button
                  className="search-button px-3"
                  type="submit"
                  disabled={loading || success}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(subscribe(email));
                  }}
                >
                  <FaEnvelopeOpenText size={23} /> <span> Subscribe</span>
                </button>
              </div>
            </div>
          </form>
        </Container>
      </section>
    </div>
  );
};

export default HomeScreen;
