import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import XMLParser from "react-xml-parser";

const FileUploader = () => {
  const [file, setFile] = useState();
  const [xml, setXml] = useState({});
  const [data, setData] = useState();
  const [tributaria, setTributaria] = useState();
  const [factura, setFactura] = useState();
  const [info, setInfo] = useState();
  const [subtotal12, setSubtotal12] = useState();
  const [subtotal0, setSubtotal0] = useState();
  const [detalle, setDetalle] = useState();

  useEffect(() => {
    if (data !== "") {
      getData();
    }
  }, [file,data]);

  useEffect(() => {
    if (data !== "" && data !== undefined) {
      orderData();
    }
  }, [xml])
  

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

  const getData = async () => {
    if (data !== "" && data !== undefined) {
      let _data = `${data.data}`;
      const _xml = new XMLParser().parseFromString(_data);
      console.log(_xml);
      setXml(_xml);
    }
  };

  const orderData = () => {
    if (xml !== {}) {
      console.log(xml);
       const _tributaria = xml.children[0].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));

      setTributaria(_tributaria);
      console.log(_tributaria)

      const _factura= xml?.children[1].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setFactura(_factura);
      console.log(_factura, 'factura');

      const _info= xml?.children[3].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setInfo(_info);
      console.log(_info, 'info');

      const _subtotal12= xml?.children[1].children[8].children[0].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setSubtotal12(_subtotal12);
      console.log(_subtotal12, 'subtotal12');

      const _subtotal0= xml?.children[1].children[8].children[1].children.map((item) => ({
        name: item.name,
        value: item.value,
      }));
      setSubtotal0(_subtotal0);
      console.log(_subtotal0, 'subtotal0');

      const _detalles=xml?.children[2].children.map(e=>e.children.map(e2=>({
        name:e2.name,
        value:e2.value
      })))
      console.log(_detalles,'detalles')
      setDetalle(_detalles);
    }
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
      {tributaria && (
        <>
          <div>
          <p>INFORMACIÓN TRIBUTARIA</p>
          <p>
          RAZÓN SOCIAL: {tributaria[0].value ? tributaria[2]?.value : ""}
          </p>
          <p>
            RUC: {tributaria[3]?.value}
          </p>
          <p>
            CLAVE DE ACCESO: {tributaria[4]?.value}
          </p>
          <p>{tributaria[10]?.value}</p>
          <hr />
     
        </div>
       
          <div>
            <p>INFORMACIÓN FACTURA</p>
            <p>
              FECHA: {factura[0].value}
            </p>
            <p>
            OBLIGADO A LLEVAR CONTABILIDAD: {factura[2].value}
            </p>
            <p>
              CLIENTE: {factura[4].value}
            </p>
            <p>
              CED/RUC: {factura[5].value}
            </p>
            <p>
              <b>TEL: </b>{info[0].value}
            </p>
            <p>
              <b>EMAIL: </b>{info[1].value}
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
                <td>SUBTOTAL 12%:</td>
                <td>{subtotal12[2].value}</td>
              </tr>
              <tr>
                <td>SUBTOTAL 0%:</td>
                <td>{subtotal0[2].value}</td>
              </tr>
              <tr>
                <td>SUBTOTAL SIN IMPUESTOS:</td>
                <td>{factura[6].value}</td>
              </tr>
              <tr>
                <td>IVA 12%:</td>
                <td>{subtotal12[3].value}</td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>{factura[10].value}</td>
              </tr>
            </tbody>
          </table> 

          
        </>
      )} 
    </>
  );
};

export default FileUploader;
