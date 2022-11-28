import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Form, Col } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import './style.css'

export default function DocumentPreview() {
    const { id } = useParams();
    const [form, setForm] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        axios.get(`http://20.100.187.128:8083/api/v1/document/${id}`, {
            headers: {
                'API-KEY': 'secret-api-key'
            }
        })
            .then(response => {
                console.log(response.data)
                setForm(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);
    return (
        <Container id='form-review'>
            {loading ? (
                <div>Loading</div>
            ) : (
                <div>
                    <Row>
                        <Col className='bold'>
                            {form.document_name}
                        </Col>
                    </Row>
                    {form.fields.map((field, index) => {
                        return (
                            <Form.Group key={index} className="pb-3 form-group">
                                <Form.Label>{field.field_name}</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        )
                    })}
                    <Row>
                        <Col>
                            <Link to={'/'} className='btn btn-primary'>Back</Link>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    )
}
