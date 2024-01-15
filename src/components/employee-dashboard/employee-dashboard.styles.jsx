import styled from "styled-components";

export const EmployeeLoginContainer = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 1200px;
  margin: auto;

  .employee-info {
    width: 50vw;
  }

  .update-info {
    width: 50vw;
  }

  h2 {
    margin: 10px 0;
  }

  .buttons-container {
  }

  .is-vaccinated {
    margin-bottom: 2rem;
  }

  .vaccine-form {
    margin-bottom: 4rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
