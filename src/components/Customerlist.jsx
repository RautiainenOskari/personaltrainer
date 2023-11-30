import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "./Customerlist.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";

function CustomerList() {

    //Luo tyhjän taulukon
    const [customers, setCustomers] = useState([]);

    //Renderöi kerran, hakee asiakkaat
    useEffect(() => {
        fetchCustomers();
    }, []);

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: '100%'},
        {field: 'city', sortable: true, filter: true, width: '100%'},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            cellRenderer: params => <Button size="small" onClick={() => deleteCustomer(params.data._links.car.href)}>Delete</Button>,
            width: 120
        }
    ]);


    //Haetaan asiakkaat
    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (response.ok)
            return response.json();
            else    
                throw new Error("Error fetcing customers:" + response.statusText);
        })
        .then (data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm("Oletko varma ?")) {
        fetch(url, {method: 'DELETE'}) //lähettää tietokantaan DELETE pyynnön
        .then(response => {
            if (response.ok)
            fetchCustomers();    //hakee autot uudelleen, uudelleenrenderöi jotta välittömästi auto poistuu
            else
            throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch (err => console.error(err))
    }
    }


    return(
        <>
        <div className="ag-theme-material" style= {{ width: '90%', height: 700, margin: 'auto'}}>
        <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            pagination={true} //sivutus
            paginationAutoPageSize = {true}
        />
        </div>
        </>
    )
}

export default CustomerList;