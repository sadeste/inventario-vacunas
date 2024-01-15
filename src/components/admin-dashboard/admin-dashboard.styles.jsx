import styled from "styled-components";

export const ListContainer = styled.div`
  th {
    padding: 0.5rem;
  }

  td {
    text-align: center;
    padding: 0.5rem;
  }

  table {
    width: 100%;
  }
`;

export const ListtHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const FilterOptionsContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 1rem;

  label {
    margin-left: 100px;
  }
`;

export const InputCheckbox = styled.input`
  padding: 0.5rem;
  margin-top: 1.4rem;
`;

export const FilterLabel = styled.label`
  position: relative;
  top: -10px;
  display: block;
`;
