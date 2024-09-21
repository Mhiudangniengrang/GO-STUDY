import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { Card, Typography } from "antd";
import room from "../assets/account/rom.png";
const { Title, Text } = Typography;

function RoomZego() {
  const { roomId } = useParams();
  const location = useLocation();
  const { roomName } = location.state || {};

  useEffect(() => {
    const appId = 149503344;
    const serverSecret = "fd63167415d3781426749a2643d3427b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      v4(),
      "Enter name..."
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: document.getElementById("meeting-container"),
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });

    return () => {
      ui.destroy();
    };
  }, [roomId]);

  return (
    <div
      className="flex items-center justify-center h-screen p-15"
      style={{
        backgroundImage: `url(${room})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
        

        <div id="meeting-container"></div>
    </div>
  );
}

export default RoomZego;
