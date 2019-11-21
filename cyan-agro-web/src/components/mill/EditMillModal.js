import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {URL_BACKEND} from "../../constants";

export class EditMillModel extends Component {

    constructor(props){
        super(props);

        this.state = { snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({
            snackbaropen: false
        })
    };


    handleSubmit(event) {
        event.preventDefault();
        fetch(`${URL_BACKEND}/mills/${event.target.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: event.target.id.value,
                name: event.target.name.value
            })
        }).then(res => {
            if(res.status === 204) {
                this.setState({snackbaropen: true, snackbarmsg: 'update successfully!'}, ()=>{
                    this.props.updatelist();
                })
            } else {
                this.setState({snackbaropen: true, snackbarmsg: 'error performing update!'})
            }
        });
    }

    render() {
        return (
            <div className='container'>
                <Snackbar anchorOrigin={{vertical: 'left', horizontal: 'bottom' }}
                          open={this.state.snackbaropen}
                          autoHideDuration={3000}
                          onClose={this.snackbarClose}
                          message={<span>{this.state.snackbarmsg}</span>}
                          action={[
                              <IconButton
                                  key='close'
                                  aria-label='Close'
                                  color='inherit'
                                  onClick={this.snackbarClose}
                              >X</IconButton>
                          ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header CloseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Mill
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label  column={6}>Id</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='id'
                                            disabled
                                            defaultValue = {this.props.id}
                                            placeholder='Mill Id'/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label  column={6}>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='name'
                                            defaultValue = {this.props.name}
                                            placeholder='Mill name'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Update Mill</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }
}
