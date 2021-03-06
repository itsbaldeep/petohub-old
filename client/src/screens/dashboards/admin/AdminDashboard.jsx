// Dependencies
import { useSelector } from "react-redux";
import { Tab, Row, Col, Nav, Container } from "react-bootstrap";
import {
  FaBars,
  FaBoxOpen,
  FaDna,
  FaDog,
  FaIcons,
  FaMapMarkerAlt,
  FaUsersCog,
} from "react-icons/fa";

// Screens
import UsersDashboard from "./users/UsersDashboard.jsx";
import DirectoriesDashboard from "./directories/DirectoriesDashboard.jsx";
import ProductsDashboard from "./products/ProductsDashboard.jsx";
import ServicesDashboard from "./services/ServicesDashboard.jsx";
import CategoriesDashboard from "./categories/CategoriesDashboard.jsx";
import PetsDashboard from "./pets/PetsDashboard.jsx";
import BrandsDashboard from "./brands/BrandsDashboard.jsx";

// Custom CSS
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Container fluid className="profile-container">
      <h2 className="my-1 pt-3">Admin Dashboard</h2>
      <Tab.Container
        id="profile-tabs"
        defaultActiveKey={user.role === "Admin" ? "first" : "fourth"}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column profile-sidebar py-2">
              {user.role === "Admin" && (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey="first">
                      <FaUsersCog /> Users
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      <FaBoxOpen /> Directories
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      <FaDna /> Services
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
              <Nav.Item>
                <Nav.Link eventKey="fourth">
                  <FaMapMarkerAlt /> Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">
                  <FaBars /> Categories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">
                  <FaDog /> Pets
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">
                  <FaIcons /> Brands
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="py-2">
              {user.role === "Admin" && (
                <>
                  <Tab.Pane eventKey="first">
                    <UsersDashboard />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <DirectoriesDashboard />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <ServicesDashboard />
                  </Tab.Pane>
                </>
              )}
              <Tab.Pane eventKey="fourth">
                <ProductsDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <CategoriesDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <PetsDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <BrandsDashboard />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;
