// CRUDComponent.js

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import axiosClient from '../axios'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const SecurityComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/securities');
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const ActionsRenderer = (props) => {
    const handleEditClick = () => {
      // Implement edit logic
      console.log('Edit clicked for ID:', props.data.id);
    };

    const handleDeleteClick = () => {
      // Implement delete logic
      console.log('Delete clicked for ID:', props.data.id);
    };

    return (
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    );
  };
  const columnDefs = [
    { headerName: 'ID', field: '_id', sortable: true, filter: true },
    { headerName: 'Name', field: 'shortname', sortable: true, filter: true, editable: true },
    { headerName: 'Description', field: 'longname', sortable: true, filter: true, editable: true },
    { headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, editable: true },
    { headerName: 'Exchange', field: 'exchange', sortable: true, filter: true, editable: true },
    { headerName: 'Industry', field: 'industry', sortable: true, filter: true, editable: true },
    { headerName: 'Actions', field: '_id', cellRenderer: ActionsRenderer, flex: 1 },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <Link to="/addsecurity">Add New Security</Link>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="single"
        suppressRowClickSelection={true}
        deltaRowDataMode={true}
        onCellValueChanged={async (event) => {
          try {
            await axiosClient.put(`/security/${event.data._id}`, event.data);
            fetchData();
          } catch (error) {
            console.error('Error updating item:', error);
          }
        }}
        onGridReady={onGridReady}
        frameworkComponents={{}}
      ></AgGridReact>
    </div>
    </DashboardLayout>
  );
};

export default SecurityComponent;
