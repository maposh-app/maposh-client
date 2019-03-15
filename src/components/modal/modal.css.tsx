import { IModal } from ".";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: ${config.theme.elementBorderRadius};
  background-color: #fff;
`;

export const StyledModal = (Modal: React.FC<IModal>) => styled(Modal)`
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.75);
    z-index: 99;
  }
  &__content {
    display: flex;
    align-content: center;
    outline: none;
  }
`;
