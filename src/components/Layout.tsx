import styled from "styled-components";
import Header from "@/components/Header";
import Content from "./Content";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
export default Layout;
