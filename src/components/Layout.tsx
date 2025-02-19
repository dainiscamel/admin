import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 800px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default Layout;
