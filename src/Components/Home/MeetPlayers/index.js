import React from "react";
import { TagAnim } from "../../Utils/Animated";
import { Tag } from "../../Utils/Common";
import Rooster from "./Rooster";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import "./MeetPlayers.css";
import { Container } from "@mui/material";

const MeetPlayers = () => {
  // const [isVisible, setVisible] = useState(false);

  const renderTextTag = (text, delay) => (
    <TagAnim
      style={{
        display: "inline-block",
        marginBottom: "8px",
        // fontSize: "86px",
        fontWeight: "900",
        color: "#b40000",
      }}
      className="meetplayers-title"
      animStyle={{
        backgroundColor: "#b40000",
      }}
      delay={delay}
    >
      {text}
    </TagAnim>
  );

  return (
    <div className="home-meetplayers">
      <Container maxWidth="lg">
        <div className="home-meetplayers-wrapper">
          {/* <Fade
            className="home_card-wrapper"
            triggerOnce
            fraction={0.3}
            delay={500}
            onVisibilityChange={(inView) => {
              if (inView) setVisible(true);
            }}
          >
            <Cards doAnimation={isVisible} />
          </Fade> */}
          <Rooster />
          <div className="home-text-wrapper">
            <div className="title-tag">
              <div>{renderTextTag("Meet", 0.3)}</div>
              <div>{renderTextTag("The", 0.3)}</div>
              <div>{renderTextTag("Players", 0.3)}</div>
            </div>
            <div className="link-tag">
              <Tag
                linkTo="/the-team"
                style={{
                  display: "inline-block",
                  border: "1px solid #e02727",
                  backgroundColor: "#ffffff",
                  fontSize: "27px",
                  color: "#e02727",
                }}
                className="meetplayers-link"
              >
                See the rooster {<DoubleArrowIcon />}
              </Tag>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MeetPlayers;
