// Dependencies
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaBookmark, FaFilter, FaMapMarker } from "react-icons/fa";

// Actions
import { loadDirectories } from "redux/actions/directory";

// Config
import { states } from "config.json";

// Components
import MainSlider from "components/MainSlider.jsx";
import Ratings from "components/Ratings";

// Custom CSS
import "./DirectoriesScreen.css";

const CheckBox = ({ label }) => (
  <Form.Group>
    <Form.Check type="checkbox" label={label}></Form.Check>
  </Form.Group>
);
const DirectoriesScreen = () => {
  const dispatch = useDispatch();
  const { loading, directories } = useSelector((state) => state.directory);
  const { directoryCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  const [showFilter, setShowFilter] = useState(window.innerWidth > 768);

  useEffect(() => {
    dispatch(loadDirectories());
    const handleResize = () => setShowFilter(window.innerWidth > 768);
    const listener = window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", listener);
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <Container className="my-2" fluid>
        <div className="directory-screen">
          <div
            className="collapse-button text-end text-primary"
            onClick={() => {
              setShowFilter((x) => !x);
            }}
          >
            <FaFilter /> Add Filters
          </div>
          <div className={`filters ${showFilter ? "d-block" : "d-none"}`}>
            <div className="category-section">
              <h4>Filter by Category</h4>
              {directoryCategories?.map((category, index) => (
                <CheckBox label={category.name} key={index} />
              ))}
            </div>
            <div className="pettype-section">
              <h4>Filter by Pet</h4>
              {pets?.map((pet, index) => (
                <CheckBox label={pet.name} key={index} />
              ))}
            </div>
            <div className="area-section">
              <h4>Filter by State</h4>
              <Form.Select defaultValue="Delhi">
                {states.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="sort-section">
              <h4>Sort By</h4>
              <CheckBox label="Newest" />
              <CheckBox label="Top Rated" />
              <CheckBox label="Most Selling" />
            </div>
            <button className="btn btn-primary">Apply Filters</button>
          </div>
          <div className="directories">
            {loading ? (
              <h3>Loading</h3>
            ) : directories.length > 0 ? (
              <Row>
                {directories.map((directory, index) => (
                  <Col sm={12} md={6} lg={4} key={index}>
                    <DirectoryCard directory={directory} key={index} />
                  </Col>
                ))}
              </Row>
            ) : (
              <h3>No directories to show</h3>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const DirectoryCard = ({ directory }) => {
  const diffTime = Math.abs(new Date() - new Date(directory.createdAt));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <Card className="m-2">
      <Link to={`/${directory.username}`}>
        <Card.Img
          variant="top"
          src={directory.directoryImages?.[0] || "/assets/placeholders/store.png"}
        />
        <Card.Body>
          <Card.Title>{directory.storeName}</Card.Title>
          <Ratings rating={directory.averageRating} size={18} className="d-inline" />
          <span className="px-1">{directory.averageRating} stars</span>

          <Card.Text>
            <FaBookmark className="text-primary" /> {directory.category.join(", ")}
            <br />
            <FaMapMarker className="text-primary" /> {directory.address}, {directory.state},{" "}
            {directory.pincode}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{diffDays} day(s) ago</Card.Footer>
      </Link>
    </Card>
  );
};

export default DirectoriesScreen;
