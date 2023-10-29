import React, { useState } from "react";
import axios from "axios";
import "./fileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [txhashInput, setTxhashInput] = useState("");
  const [outputScript, setOutputScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorTx, setErrorTx] = useState("");
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const allowedExtensions = ["png", "jpg", "jpeg"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (
        selectedFile.size <= 10 * 1024 * 1024 &&
        allowedExtensions.includes(fileExtension)
      ) {
        setFile(selectedFile);
        // buttonState(true)
        setError("");
      } else {
        if (!allowedExtensions.includes(fileExtension)) {
          setError("Incorrect file type");
        } else {
          setError("File size exceeds the limit");
        }
        setFile(null);
      }
    }
  };

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true)
        const response = await axios.post("http://localhost:3001/upload", formData);
        console.log(response);
        setLoading(false)
        if (response.status === 200) {
          const data = response.data;
          console.log(data)
          setServerResponse(data.message);
          setOutputScript(data.tx);

        } else {
          console.error("File upload failed");
          setServerResponse("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
        setServerResponse("Error uploading the file");
      }
    } else {
      setError("Please choose a file");
    }
  };

  const openTxHashPage = () => {
    if (txhashInput) {
      const url = `https://testnet.greenfieldscan.com/tx/${txhashInput}`;
      window.open(url, "_blank");
      setErrorTx("")
    } else {
      setErrorTx("No transaction")
    }
  };

  if (loading === true) {
      return <div className="loading-container">
      <div className="loading-message">Waiting Transaction to finish...</div>
    </div>
  }

  return (
    <div className="form-container">
  <div className="centered-heading">
    <h1 className="centered-heading">D-Storage on GreenField</h1>
  </div>
  <div className="dropzone-container">
    <input type="file" onChange={handleFileChange} />        
  </div>
  {error && <div className="error-message">{error}</div>}
  <div className="file-upload-info">
    <p>File name cannot contain spaces</p>
    <p>File size limit to 10Mb and only accept PNG, JPG, JPEG</p>
  </div>
  <button className="upload-button" onClick={uploadFile}>
    Upload
  </button>
  {serverResponse && (
    <div className="server-response">
      <p>Server Response:</p>
      <div className="terminal-content">{serverResponse}</div>
    </div>
  )}
  {
    outputScript && (
      <div className="server-response">
        <p>TransactionHx:</p>
        <div className="terminal-content">{outputScript}</div>
      </div>
    )
  }
  <div className="txhash-input-container">
    <input
      type="text"
      className="txhash-input"
      placeholder="Enter Transaction Hash"
      value={txhashInput}
      onChange={(e) => setTxhashInput(e.target.value)}
    />
    <button className="open-tx-button" onClick={openTxHashPage}>
      See Transaction
    </button>
  </div>
  {errorTx && <div className="error-message">{errorTx}</div>}
</div>
  );
};

export default FileUpload;