import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "./Customerlist.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TrainingList() {

    //Luo tyhjän taulukon
    const [training, setTraining] = useState([]);

    //Renderöi kerran, hakee asiakkaat
    useEffect(() => {
        fetchTraining();
    }, []);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},

    ]);


    //Haetaan asiakkaat
    const fetchTraining = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
        .then(response => {
            if (response.ok)
            return response.json();
            else    
                throw new Error("Error fetcing training:" + response.statusText);
        })
        .then (data => setTraining(data.content))
        .catch(err => console.error(err))
    }


    return(
        <>
        <div className="ag-theme-material" style= {{ width: '600%', height: 700, margin: 'auto'}}>
        <AgGridReact
            rowData={training}
            columnDefs={columnDefs}
            pagination={true} //sivutus
            paginationAutoPageSize = {true}
        />
        </div>
        </>
    )
}

export default TrainingList;