import React from "react";
import { useParams } from "react-router-dom";
import JitsiMeet from "../../components/JitsiMeet";

function RoomName() {
  const { roomName } = useParams();

  const formattedRoomName = roomName.replace(/-/g, " ");

  return (
    <div>
      <JitsiMeet roomName={formattedRoomName} />
    </div>
  );
}

export default RoomName;
