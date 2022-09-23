import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function datatable(props) {
    return(
        <DataTable value={props.data}>
            {props.columnList}
        </DataTable>
    )
}

export default datatable;