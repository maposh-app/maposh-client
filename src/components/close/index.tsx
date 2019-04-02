import styled from "../../service/theme/styled-components";

const Close = styled.div`
  position: relative;
  align-self: flex-start;
  right: 5px;
  top: 5px;
  display: inline-block;
  width: 16px;
  height: 16px;
  overflow: hidden;
  margin: 5px;
  opacity: 0.3;
  :hover {
    opacity: 1;
  }
  :before,
  :after {
    position: absolute;
    left: 0;
    content: "";
    height: 2px;
    margin-top: -1px;
    top: 50%;
    width: 100%;
    background-color: #333;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export default Close;
