import { styled } from 'styled-components';
import Detail from './detail.component';

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

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
