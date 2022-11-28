import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateForm() {
    const navigate = useNavigate();
    const options = [{ id: 1, name: 'Input' }, { id: 2, name: 'Select' }, { id: 3, name: 'NumberInput' }]
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), field_seq: '', field_type: options[0].id, field_name: '', is_mandatory: 1 },
    ]);
    const [formName, setFormName] = useState('');
    const handleChangeInput = (id, event) => {
        console.log(event.target.name)
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                if (event.target.name === "is_mandatory") {
                    if (event.target.checked) {
                        i[event.target.name] = 1
                    } else {
                        i[event.target.name] = 0
                    }
                } else if (event.target.name === "field_type") {
                    options.forEach(option => {
                        if (option.name === event.target.value) {
                            i[event.target.name] = option.id
                        }
                    })
                } else {
                    i[event.target.name] = event.target.value
                }
            }
            return i;
        })
        setInputFields(newInputFields);
    }
    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), field_seq: '', field_type: options[0].id, field_name: '', is_mandatory: 1 }])
    }
    const handlePostData = (e) => {
        e.preventDefault();
        inputFields.forEach(field => {
            delete field.id
        });
        const newForm = {
            document_name: formName,
            form_values: inputFields
        }
        console.log(newForm)
        axios.post(`http://20.100.187.128:8083/api/v1/documents/create`, newForm, {
            headers: {
                'API-KEY': 'secret-api-key'
            }
        })
            .then((response) => {
                console.log(response)
                navigate('/')
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }
    return (
        <Container id='container-form'>
            <Form>
                <Form.Group className="pb-3 form-group" controlId="formTitle">
                    <Form.Label>Document title</Form.Label>
                    <Form.Control type="text" value={formName} onChange={event => setFormName(event.target.value)} />
                </Form.Group>
                {inputFields.map((field, index) => {
                    return (
                        <div key={`field+${index}`}>
                            <Form.Group className="py-3" controlId="formSequence">
                                <Form.Label>Field sequence (weight)</Form.Label>
                                <Form.Control type="number" name="field_seq" value={field.field_seq} onChange={event => handleChangeInput(field.id, event)} />
                            </Form.Group>
                            <Form.Group className="pb-3" controlId="formType">
                                <Form.Label>Field type</Form.Label>
                                <Form.Select name="field_type" value={field.field_type} onChange={event => handleChangeInput(field.id, event)}>
                                    {options.map((option, index) => {
                                        return (
                                            <option key={`${option}+${index}`}>{option.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="pb-3" controlId="formName">
                                <Form.Label>Field Name</Form.Label>
                                <Form.Control type="text" name="field_name" value={field.field_name} onChange={event => handleChangeInput(field.id, event)} />
                            </Form.Group>
                            <Form.Group className="pb-3 form-group" controlId={`formCheckbox${index}`}>
                                <Form.Check type="checkbox" checked={field.is_mandatory === 1 ? (true) : false} label="Mandatory" name="is_mandatory" value={field.is_mandatory} onChange={event => handleChangeInput(field.id, event)} />
                            </Form.Group>
                        </div>
                    )
                })}
                <Row className='my-3'>
                    <Col className='d-flex justify-content-between'>
                        <Button variant='light' onClick={handleAddFields}>Add more</Button>
                        <Button variant='primary' onClick={handlePostData}>Save</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
