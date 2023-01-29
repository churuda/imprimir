import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import XMLParser from "react-xml-parser";

const FileUploader = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState("");
  const [xml, setXml] = useState();

  useEffect(() => {
    if (data !== "") {
      console.log(data);
      let _data = `${data.data}`;
      setXml(new XMLParser().parseFromString(_data));
      console.log(xml);
    }
  }, [data]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const  handleUploadClick = async (event) => {
    if (!file) {
      return;
    }
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: file,
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="header">
        <h1>Comercial Carlitos</h1>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button style={{ marginTop: "20px" }} onClick={handleUploadClick}>
          Upload
        </button>
      </div>
      {xml && (
        <table style={{ fontSize: "8px", marginTop: "1px" }}>
          <thead style={{ fontSize: "8px" }}>RIVERA CRESPO ROSA ELVIRA</thead>
          <tbody>
            <tr style={{ fontSize: "8px", marginTop: "1px" }}>
              RUC:<span>0105478200</span>
            </tr>
            <tr style={{ fontSize: "8px", marginTop: "1px" }}>
              CONTRIBUYENTE RÉGIMEN RIMPE
            </tr>
            <tr style={{ fontSize: "8px", marginTop: "1px" }}>
              DIR:
              <span>MIGUEL ULLAURI Número: 5-17 Intersección: CALLE LARGA</span>
            </tr>
            <tr></tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};



export default FileUploader;
