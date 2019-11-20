import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";


export class AddMillModel extends Component {

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
        fetch('http://localhost:8000/mills', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event.target.name.value
            })
        }).then(res => res.json()).then((result) => {
            this.setState({snackbaropen: true, snackbarmsg: result.data.message})
        }, (error) => {
            this.setState({snackbaropen: true, snackbarmsg: error.data.message})
        })
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
                            Add Mill
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                           <Row>
                               <Col sm={6}>
                                   <Form onSubmit={this.handleSubmit}>
                                       <Form.Group controlId="name">
                                           <Form.Label  column={6}>Name</Form.Label>
                                           <Form.Control type='text' name='name' placeholder='Mill name'/>
                                       </Form.Group>
                                       <Form.Group>
                                           <Button variant='primary' type='submit'>Add Mill</Button>
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
