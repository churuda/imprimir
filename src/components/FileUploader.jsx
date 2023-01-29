import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import XMLParser from "react-xml-parser";

const FileUploader = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState("");
  const [xml, setXml] = useState();
  const [factura, setFactura] = useState();
  const [tributaria, setTributaria] = useState();
  const [detalle,setDetalle]=useState();
  useEffect(() => {
    if (data !== "") {
      console.log(data);
      let _data = `${data.data}`;
      setXml(new XMLParser().parseFromString(_data));
      console.log(xml);
    }
  }, [data]);
  useEffect(() => {
    orderData();
  }, [xml]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async (event) => {
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

  const orderData = () => {
    if (xml !== "" && xml !== undefined) {
      const _tributaria = xml.children[0].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setTributaria(_tributaria);
      console.log(_tributaria, 'tributaria');
      
      const _factura= xml.children[1].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setFactura(_factura);
      console.log(_factura, 'factura');
    }
  //   const _detalle= xml.children[2].children.map((item) => ({
  //     name: item.name,
  //     value: item.value,
  //   }));
  //   setDetalle(_detalle);
  //   console.log(detalle, 'detalle');
  // }
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
        <>
          <div>
            <p>INFORMACIÓN TRIBUTARIA</p>
            <p>
              <b>RAZÓN SOCIAL: </b>
            </p>
            <p>Calle: MIGUEL ULLAURI Número: 5-17 Intersección: CALLE LARGA</p>
            <p>
              <b>RUC: </b>0105478200
            </p>
            <p>
              <b>CLAVE DE ACCESO: </b>
              2701202301030112892200120011000000000497904123811
            </p>
            <p>CONTRIBUYENTE RÉGIMEN RIMPE</p>
            <hr />
       
          </div>
          <div>
            <p>INFORMACIÓN FACTURA</p>
            <p>
              <b>FECHA: </b>27/01/2023
            </p>
            <p>
              <b>OBLIGADO A LLEVAR CONTABILIDAD: </b>NO
            </p>
            <p>
              <b>CLIENTE: </b>GUILLEN MORA JULIA ROSARIO
            </p>
            <p>
              <b>CED/RUC: </b>0100490556
            </p>
            <p>
              <b>TEL: </b>820333
            </p>
            <p>
              <b>EMAIL: </b>catileon_07@hotmail.com
            </p>
            <p>==========================</p>
          </div>
          <table style={{ fontSize: "8px", marginTop: "1px" }}>
            <tbody>
              <tr>
                <td>COD</td>
                <td>CANT.</td>
                <td>PVP</td>
                <td>TOTAL</td>
              </tr>
              <tr>
                <td>COD</td>
                <td>CANT.</td>
                <td>PVP</td>
                <td>TOTAL</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default FileUploader;
