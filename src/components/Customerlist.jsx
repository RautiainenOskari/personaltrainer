import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import moment from "moment";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import CsvDownloader from "react-csv-downloader";

function CustomerList() {
  //Luo tyhjän taulukon
  const [customers, setCustomers] = useState([]);

  //Renderöi kerran, hakee asiakkaat
  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true, width: "100%" },
    { field: "city", sortable: true, filter: true, width: "100%" },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <AddTraining saveTraining={saveTraining} data={params.data} />
          <EditCustomer updateCustomer={updateCustomer} data={params.data} />
          <Button
            size="small"
            onClick={() => deleteCustomer(params.data.links[0].href)}
          >
            Delete
          </Button>
        </div>
      ),
      width: 400,
    },
  ]);

  //Haetaan asiakkaat
  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error fetcing customers:" + response.statusText);
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure ?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
  };

  const saveCustomer = (customer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const saveTraining = (training) => {
    const formattedDate = moment(training.date).toISOString();

    const trainingData = {
      ...training,
      date: formattedDate,
    };
    fetch("https://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainingData),
    })
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const csvColumns = [
    { field: "firstname", headerName: "First Name" },
    { field: "lastname", headerName: "Last Name" },
    { field: "streetaddress", headerName: "Street Address" },
    { field: "postcode", headerName: "Postcode" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
  ];

  return (
    <>
      <AddCustomer saveCustomer={saveCustomer} />
      <div
        className="ag-theme-material"
        style={{ width: "90%", height: 700, margin: "auto" }}
      >
        <div>
        <CsvDownloader
  filename="myfile"
  extension=".csv"
  separator=";"
  wrapColumnChar="'"
  columns={csvColumns.map((column) => ({
    id: column.field,
    displayName: column.headerName || column.field,
  }))}
  datas={customers.map((customer) => {
    const rowData = {};
    csvColumns.forEach((column) => {
      const value = customer[column.field];
      if (value !== undefined) {
        rowData[column.field] = value;
      }
    });
    return rowData;
  })}
  text="Download CSV"
/>
        </div>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default CustomerList;
