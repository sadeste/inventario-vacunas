import styled from "styled-components";

export const NavigationContainer = styled.div`
  background-color: black;
  color: white;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  font-weight: bold;

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const UserInfoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const UserInfo = styled.span`
  padding: 10px 15px;
  //cursor: pointer;
`;

export const SignOutfoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SpanLink = styled.span`
  padding: 10px 15px;
  cursor: pointer;
`;
