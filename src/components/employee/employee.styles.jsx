import styled from "styled-components";

export const EmployeeContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .name,
  .price {
    width: 23%;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Quantity = styled.span`
  display: flex;
  width: 23%;

  .arrow {
    cursor: pointer;
  }

  .value {
    margin: 0 10px;
  }
`;

export const ActionButton = styled.div`
  text-align: center;
  display: inline-block;
  cursor: pointer;
`;
