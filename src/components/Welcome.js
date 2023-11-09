import React, { useEffect, useState } from "react";
import axios from "axios";
import Test from "./Test";
import ShowData from "./ShowData";
import Admin from "./Admin";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  }; 
  const sednRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []
  );

  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const handleStartAssessment = () => {
    socket.emit("startAssessmentRequest");

    setAssessmentStarted(!assessmentStarted);
  };
  return <div>{user && <h1>{user.name}</h1>}
 
  <div>
      {!assessmentStarted ? (
        <button onClick={handleStartAssessment}>Start Assessment</button>
      ) : (
        <ShowData />
      )}
      {/* <Admin socket={socket} /> */}
    </div>
  
  </div>;

};

export default Welcome;