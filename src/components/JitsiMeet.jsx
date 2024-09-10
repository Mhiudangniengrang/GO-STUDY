import React, { useEffect } from "react";
import Cookies from "js-cookie";

function JitsiMeet({ roomName }) {
  useEffect(() => {
    const domain = "meet.jit.si";
    const jwtToken = Cookies.get("token");
    const options = {
      roomName: "vpaas-magic-cookie-5774a86844314e08a9cf5681691a1344/go!study",
      width: "100%",
      height: 720,
      parentNode: document.getElementById("jitsi-container"),
      jwt: jwtToken,
      // jwt: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjNWU0MTg0M2M1ZDUyZTY4ZWY1M2UyYmVjOTgxNDNkYTE0NDkwNWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWluaCBIaeG6v3UgRMawxqFuZyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZk13NEllNGxzbG5XVTNxTGY3QWJwdzhDbUY2TmtRNmJEckg1OUV1MTE5WHJySTA4PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL21lZXQtaml0LXNpLTY2Y2JkIiwiYXVkIjoibWVldC1qaXQtc2ktNjZjYmQiLCJhdXRoX3RpbWUiOjE3MjU4OTc0MjgsInVzZXJfaWQiOiJpcDFpUkJDdTZkZHRXTzZBbTUxZ040YVdtR2YxIiwic3ViIjoiaXAxaVJCQ3U2ZGR0V082QW01MWdONGFXbUdmMSIsImlhdCI6MTcyNTkwMzM3MCwiZXhwIjoxNzI1OTA2OTcwLCJlbWFpbCI6ImRtaGlldTIxMTIyMDAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNDI0Njk1MzI4ODQ1MzMwOTkxIl0sImVtYWlsIjpbImRtaGlldTIxMTIyMDAyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.dfc2idtSI4dz8umTs6Y83G7T7wXi66E4ZVgo9pEpeoUwHKfuE1bZzIt-iBlQQXfGNbKML_t80F9vmW9AqmXK0o-cae-ZpSy8cYrxRHepfAW-MPnIbaeUmYljpzH9XJ6e3YnxQ-gXe3NJKQ6CH65OMm1veoCh1flUS-8AFAK0_Zu-Q4VPtDIAgsRDTF2cw88j8K_HvVNRc6dyAwNxXogipVwd_xxcjHs-17AhN8-GGcmxSfS58SMfAF2hd0GxJ4yAehC1sDXkZqp0qSDSHqBhx_3E3px4Iuj57IUqiy4ij42IyLgFx01nH5h0stuw8KzJ-YFZz-jn4gQMrkE8Tpy0-Q",
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose();
  }, [roomName]);

  return (
    <div id="jitsi-container" style={{ width: "100%", height: "500px" }} />
  );
}

export default JitsiMeet;
