import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'

export default function TableView() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const formatDate = (documentDate) => {
        let date = new Date(documentDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return `${dt}.${month}.${year}`;
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`http://20.100.187.128:8083/api/v1/documents`, {
            headers: {
                'API-KEY': 'secret-api-key'
            }
        })
            .then(response => {
                setData(response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return (
        <Container id='table-view'>
            {loading ? (
                <div>Loading</div>
            ) : (
                <>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Link to={'/create-form'} className='btn btn-primary'>New document form</Link>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Table striped bordered hover id='table-data'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Document title</th>
                                        <th>Created date</th>
                                        <th>Document size</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((document) => {
                                        return (
                                            <tr key={document.id}>
                                                <td>
                                                    {document.id}
                                                </td>
                                                <td>
                                                    {document.document_name}
                                                </td>
                                                <td>
                                                    {formatDate(document.created_at)}
                                                </td>
                                                <td>
                                                    {document.field_count}
                                                </td>
                                                <td>
                                                    <Link to={`/document-preview/${document.id}`}>Document preview</Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}
