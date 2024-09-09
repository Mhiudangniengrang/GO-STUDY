import React, { useEffect } from "react";

function JitsiMeet({ roomName }) {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "vpaas-magic-cookie-5774a86844314e08a9cf5681691a1344/go!study",
      width: "100%",
      height: 500,
      parentNode: document.getElementById("jitsi-container"),
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose();
  }, [roomName]);

  return (
    <div id="jitsi-container" style={{ width: "100%", height: "500px" }} />
  );
}

export default JitsiMeet;

