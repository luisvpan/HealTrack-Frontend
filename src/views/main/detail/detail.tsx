import { styled } from "styled-components";
import Detail from "./detail.component";

export default styled(Detail)`
  display: flex;
  flex-direction: column;

  .patients-detail-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .container-form-services {
    width: 100%;
    padding: 0px;
  }
`;
