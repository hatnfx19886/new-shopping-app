import { Container } from "react-bootstrap";
import ChatPopup from "./ChatPopup";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <Container fluid="md">
        <Header />
        <main>{props.children}</main>
      </Container>
      <Footer />
      <ChatPopup />
    </>
  );
};

export default Layout;
