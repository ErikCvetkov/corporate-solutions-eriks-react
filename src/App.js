import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TableView from './Components/Table/TableView';
import CreateForm from './Components/CreateForm/CreateForm';
import DocumentPreview from './Components/DocumentPreview/DocumentPreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/document-preview/:id" element={<DocumentPreview />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
