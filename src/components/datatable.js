import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Datatable(props) {
    const selectionChange = e => {
        props.clickedColumn(e.value);
    }
    return(
        <DataTable selectionMode="single" onSelectionChange={e => selectionChange(e)} value={props.data}>
            {props.columnList}
        </DataTable>
    )
}

export default Datatable;