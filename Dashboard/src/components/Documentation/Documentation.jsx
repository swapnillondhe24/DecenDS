import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./Documentation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faUserTag,
  faCopy,
  faCircleNodes,
  faUpload,
  faDownload,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";

function Documentation() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  if (!token) {
    // Redirect to login if the user is not authenticated
    window.location.href = "/signin";
    return null;
  }
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `${token}` },
  };
  return (
    <div className="documentation">
      <Header peerId={data?.peerId} coins_earned={data?.coins_earned} />
      <div className="docs-inner">
        <h2>Getting started</h2>
        <hr />
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faUserPen} size="lg" />
            Create your account
          </h4>
          <ul>
            <li>Just choose SIGN UP from the login screen in the app.</li>
            <li>You can use your email address.</li>
            <li>
              Upon successful login, you'll be directed to your user dashboard
              and a Peer-ID will be generated.
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faUserPen} size="lg" />
            Logging In
          </h4>
          <ul>
            <li>
              If the user is already registered, then enter your registered
              username/email and password.
            </li>
            <li>Click on the "Login" or "Sign In" button to log in.</li>
            <li>
              Upon successful login, you'll be directed to your user dashboard.
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faCopy} size="lg" />
            Storing the generated Peer-ID
          </h4>
          <ul>
            <li>
              After successful login, you can get your Peer-ID from the user
              dropdown
            </li>
            <li>Note down or copy your peer ID for future use.</li>
          </ul>
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faCircleNodes} size="lg" />
            Hosting a Node
          </h4>
          <ul>
            <li>In the user dropdown, find the option to host a node.</li>
            <li>Note down or copy your peer ID for future use.</li>
          </ul>
          <ImageCarousel />
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faUpload} size="lg" />
            File Upload:
          </h4>
          <ul>
            <li>Navigate to the file upload section in your user dashboard.</li>
            <li>
              Look for an "Upload" or "Choose File" button and click on it.
            </li>
            <li>Select the file you want to upload from your local device.</li>
            <li>Wait for the file to finish uploading.</li>
            <li>
              Upon completion, the website will provide a confirmation message
              or display the uploaded file in your dashboard.
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faDownload} size="lg" />
            File Download:
          </h4>
          <ul>
            <li>
              To download your uploaded files, locate the file download section
              in your user dashboard.
            </li>
            <li>Look for a list or grid view of your uploaded files.</li>
            <li>
              Find the file you want to download and click on the corresponding
              download link or button.
            </li>
            <li>
              The website will initiate the file download process, and your
              browser will prompt you to save the file to your device.
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faMobile} size="lg" />
            Allocating/Renting Mobile Storage (Android App):
          </h4>
          <ul>
            <li>
              On your Android device, open the Google Play Store or the app
              store associated with your device.
            </li>
            <li>Search for the application associated with the website</li>
            <li>Install the application on your device.</li>
            <li>
              Launch the application and log in using your website credentials.
            </li>
            <li>
              Follow the instructions provided within the application to
              allocate your mobile storage or rent storage from other users.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
