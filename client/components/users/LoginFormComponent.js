import React from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';

const LoginFormComponent = () => {

    const sendData = (event) => {
        event.preventDefault();
        console.log('send data');
    }

    return(
        <div className="mt-5">
            <Container>
                <Row>
                    <Col sm={12} md={12}>
                        <h2 className="text-center"> Sistema de manejo de usuarios.</h2>
                    </Col>
                    <Col sm={12} md={12} className="d-flex flex-column align-items-center justify-content-center">
                        <Form className="col-12 col-md-7" onClick={sendData}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Ingrese su correo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="passsword" placeholder="Ingrese su contraseña" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Iniciar Sesion
                            </Button>
                            <Button variant="success" className="ml-2">
                                Crear Usuario
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginFormComponent;