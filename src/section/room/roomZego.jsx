import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { Card, Typography } from "antd";
import room from "../assets/account/rom.png";
import AudioFile1 from "../assets/music/lofi-orchestra-162306.mp3";
import AudioFile2 from "../assets/music/lofi-song-jinsei-by-lofium-236730.mp3";
import AudioFile3 from "../assets/music/lofi-song-room-by-lofium-242714.mp3";
import AudioFile4 from "../assets/music/playa-del-sol-latin-lofi-160149.mp3";
import AudioFile5 from "../assets/music/satisfying-lofi-for-focus-study-amp-working-242103.mp3";
import AudioPlayer from "./audioPlayer";
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
      "You"
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
            window.location.pathname,
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
  const audioFiles = [
    AudioFile1,
    AudioFile2,
    AudioFile3,
    AudioFile4,
    AudioFile5,
  ];
  return (
    <div
      style={{
        backgroundImage: `url(${room})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {" "}
      <AudioPlayer audioFiles={audioFiles}  />
      <div id="meeting-container"></div>
    </div>
  );
}

export default RoomZego
