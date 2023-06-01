import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { PasswordContext } from "../PasswordContext";

function DownloadTable() {
  let loadingGif = require("../../images/loading.gif");
  const token = localStorage.getItem("token");
  const { password } = useContext(PasswordContext);
  const [fileURL, setFileURL] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [decryptedFileUrl, setDecryptedFileUrl] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get_file_list`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `${token}` },
  };

  const handleDownload = async (itemId) => {
    const item = data.find((item) => item.cid === itemId);

    console.log(item.cid);
    const downloadUrl = `http://${item.cid}.ipfs.w3s.link`;

    try {
      const response = await fetch(downloadUrl, { redirect: "follow" });
      if (!response.ok) {
        throw new Error(
          `Error downloading the file. Status: ${response.status}`
        );
      }
      const encryptedBlob = await response.blob();

      // Read the encrypted file blob as an ArrayBuffer
      const encryptedFileBuffer = await readFileAsArrayBuffer(encryptedBlob);

      // Decrypt the file using the password
      const pwd = password;
      const decryptedFileBuffer = await decryptFile(encryptedFileBuffer, pwd);

      // Create a Blob from the decrypted file buffer
      const decryptedBlob = new Blob([decryptedFileBuffer], {
        type: item.type,
      });

      // Create a temporary URL for the decrypted file
      const decryptedFileUrl = URL.createObjectURL(decryptedBlob);

      const link = document.createElement("a");
      link.href = decryptedFileUrl;
      link.download = item.name;
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(decryptedFileUrl);

      // Set the decrypted file URL
      setDecryptedFileUrl(decryptedFileUrl);

      // Open the URL in a new window or tab for download
      // const newWindow = window.open(decryptedFileUrl, "_blank");
      // if (!newWindow) {
      //   throw new Error("Failed to open new window for download");
      // }

      // // Set the decrypted file URL
      // setDecryptedFileUrl(decryptedFileUrl);
    } catch (error) {
      console.error(
        "Error occurred while downloading and decrypting the file:",
        error
      );
    }
  };

  const decryptFile = async (encryptedFileBuffer, pwd) => {
    try {
      console.log("Starting decryption...");

      // Generate a derived key from the user's password
      const keyMaterial = await getKeyMaterial(pwd);
      console.log("Derived key material:", keyMaterial);

      const key = await deriveKey(keyMaterial);
      console.log("Derived encryption key:", key);

      // Split the encrypted file buffer into IV and encrypted data
      const iv = encryptedFileBuffer.slice(0, 16);
      const encryptedData = encryptedFileBuffer.slice(16);

      // Decrypt the file using AES-GCM algorithm
      const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      console.log("Decryption successful.");

      // Return the decrypted file buffer
      return new Uint8Array(decryptedData);
    } catch (error) {
      console.error("Error occurred while decrypting file:", error);
      throw error;
    }
  };

  const readFileAsArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as ArrayBuffer"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file as ArrayBuffer"));
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const getKeyMaterial = async (pwd) => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(pwd);

    const algo = {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new Uint8Array(16),
      iterations: 100000,
    };

    const derivedKey = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      algo,
      false,
      ["deriveKey"]
    );

    return derivedKey;
  };

  // Function to derive the encryption key from the derived key
  const deriveKey = async (derivedKey) => {
    const algo = {
      name: "AES-GCM",
      length: 256,
    };

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16),
        iterations: 100000,
        hash: "SHA-256",
      },
      derivedKey,
      algo,
      false,
      ["encrypt", "decrypt"]
    );

    return key;
  };

  // Function to concatenate two Uint8Arrays
  const concatenateBuffers = (buffer1, buffer2) => {
    const combined = new Uint8Array(buffer1.length + buffer2.length);
    combined.set(buffer1);
    combined.set(buffer2, buffer1.length);
    return combined;
  };

  // const handleDownload = (itemId) => {
  //   const item = data.find((item) => item.cid === itemId);
  //   if (item) {
  //     console.log(item.cid);
  //     const downloadUrl = `http://${item.cid}.ipfs.w3s.link`;

  //     window.open(downloadUrl, "_blank");
  //   }
  // };

  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  // const [links, setLinks] = useState([]);
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   fetch("https://1a11-152-58-19-225.ngrok-free.app/get_file_list", {
  //     method: "POST",
  //     headers: { Authorization: `${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLinks(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>
      {loading ? (
        <img src={loadingGif} alt="Loading" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <Row style={{ marginBottom: "10px", display: "flex" }}>
                  <Col lg="10">
                    <td>{item.name}</td>
                  </Col>

                  <Col lg="2" className="d-flex justify-content-end">
                    <button
                      onClick={() => handleDownload(item.cid)}
                      className="download_file_btn"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </Col>
                </Row>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DownloadTable;
