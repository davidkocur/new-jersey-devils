import React, { useState } from "react";
import { TagAnim } from "../../Utils/Animated";
import { Tag } from "../../Utils/Common";
import Rooster from "./Rooster";

import "./MeetPlayers.css";

const MeetPlayers = () => {
  const [isVisible, setVisible] = useState(false);

  const renderTextTag = (text, delay) => (
    <TagAnim
      style={{
        display: "inline-block",
        marginBottom: "8px",
        fontSize: "86px",
        fontWeight: "900",
        // lineHeight: "1.2",
        color: "#b40000",
      }}
      animStyle={{
        backgroundColor: "#b40000",
      }}
      delay={delay}
    >
      {text}
    </TagAnim>
  );

  return (
    <div className="home_meetplayers">
      <div className="container">
        <div className="home_meetplayers_wrapper">
          {/* <Fade
            className="home_card_wrapper"
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
          <div className="home_text_wrapper">
            <div>{renderTextTag("Meet", 0.3)}</div>
            <div>{renderTextTag("The", 0.3)}</div>
            <div>{renderTextTag("Players", 0.3)}</div>
            <div>
              <Tag
                linkTo="/the-team"
                style={{
                  display: "inline-block",
                  marginTop: "90px",
                  marginBottom: "27px",
                  marginLeft: "12px",
                  border: "1px solid #e02727",
                  backgroundColor: "#ffffff",
                  fontSize: "27px",
                  color: "#e02727",
                }}
              >
                Meet them here
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetPlayers;
