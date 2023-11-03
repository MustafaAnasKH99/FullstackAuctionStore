import styled from "styled-components";

const TopHeader = styled.header`
  padding: 20px;
  background-color: #003049;
  color: #fff;
  text-align: center;
  font-size: 24px;
  width: 97%;
`;

export default function Header() {
  return (
    <TopHeader>
          Full Stack Auction Store
    </TopHeader>
  );
}