import React from "react";
import { useParams } from "react-router-dom";
import JitsiMeet from "../../components/JitsiMeet";

function RoomName() {
  const { roomName } = useParams();

  // Chuyển đổi chữ thường về chữ hoa nếu cần
  const formattedRoomName = roomName.replace(/-/g, " ");

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Current Room: {formattedRoomName}</h2>
      <JitsiMeet roomName={formattedRoomName} />
    </div>
  );
}

export default RoomName;
