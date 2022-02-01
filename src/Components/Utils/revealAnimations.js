import { keyframes } from "@mui/styled-engine";

export const fadeInLeft = (distance) => keyframes`
from {
  opacity: 0;
  transform: translate3d(-${distance}px, 0, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;
