import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const navList = [
  { id: 1, text: "movie", url: "/movie" },
  { id: 2, text: "tv", url: "/tv" },
  // { id: 3, text: "people", url: "/people" },
];

function Header() {
  const { pathname } = useLocation();

  console.log(pathname);
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link to="/">NeppMovie</Link>
        </Logo>
        <Gnb>
          <ul>
            {navList.map((nav) => (
              <li
                key={nav.id}
                style={{ fontWeight: pathname === nav.url && 700 }}
              >
                <Link to={nav.url}>{nav.text}</Link>
              </li>
            ))}
            {/* 
            <li>
              <Link to="">TV</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li> */}
          </ul>
        </Gnb>
        <input type="text" />
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  padding: 10px 20px;
  border-bottom: 1px solid #666;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 900px;
  flex: 1;
  margin: 0 auto;
`;

const Logo = styled.h1``;
const Gnb = styled.nav`
  flex: 1;
  ul {
    display: flex;
    flex: 1;
    gap: 20px;
    margin-left: 30px;
  }
`;

export default Header;
