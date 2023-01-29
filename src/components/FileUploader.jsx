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
              <b>RAZÓN SOCIAL: </b> TRIBUTARIA: 2
            </p>
            <p>TRIBUTARIA: 9</p>
            <p>
              <b>RUC: </b>TRIBUTARIA: 3
            </p>
            <p>
              <b>CLAVE DE ACCESO: </b>
              TRIBUTARIA: 4
            </p>
            <p>TRIBUTARIA: 10</p>
            <hr />
       
          </div>
          <div>
            <p>INFORMACIÓN FACTURA</p>
            <p>
              <b>FECHA: </b>FACTURA: 0
            </p>
            <p>
              <b>OBLIGADO A LLEVAR CONTABILIDAD: </b>FACTURA: 2
            </p>
            <p>
              <b>CLIENTE: </b>FACTURA: 4
            </p>
            <p>
              <b>CED/RUC: </b>FACTURA: 5
            </p>
            <p>
              <b>TEL: </b>820333
            </p>
            <p>
              <b>EMAIL: </b>catileon_07@hotmail.com
            </p>
            <hr />
          </div>
          <table >
            <tbody>
              <tr>
                <td>COD</td>
                <td>CANT.</td>
                <td>PVP</td>
                <td>TOTAL</td>
              </tr>
              <tr>
                <td>val</td>
                <td>val</td>
                <td>val</td>
                <td>val</td>
              </tr>
            </tbody>
            </table>
            <hr />
            <table >
            <tbody>
              <tr>
                <td>SUBTOTAL IVA:</td>
                <td>VAL</td>
              </tr>
              <tr>
                <td>SUBTOTAL SIN IMPUESTOS:</td>
                <td>FACTURA: 6: name: 'importeTotal'</td>
              </tr>
              <tr>
                <td>IVA 12%:</td>
                <td>val</td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>FACTURA: 10: name: 'importeTotal'</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default FileUploader;
