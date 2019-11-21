import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {URL_BACKEND} from "../../constants";

export class EditFarmModel extends Component {

    constructor(props){
        super(props);

        this.state = { harvests: [], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refresh() {
        fetch( `${URL_BACKEND}/harvests`).then(response => response.json()).then(data => {
            data = data.data;
            this.setState({
                harvests: data
            })
        })
    }
    componentDidMount() {
        this.refresh();
    }

    snackbarClose = (event) => {
        this.setState({
            snackbaropen: false
        })
    };

    handleSubmit(event) {
        event.preventDefault();
        fetch( `${URL_BACKEND}/farms/${ event.target.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: event.target.id.value,
                code: event.target.code.value,
                name: event.target.name.value,
                harvestId: event.target.harvestId.value
            })
        }).then(res => {
            if(res.status === 204) {
                this.setState({snackbaropen: true, snackbarmsg: 'update successfully!'});
                this.props.updatelist();
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
                            Edit Farm
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label  column={6}>Id</Form.Label>
                                        <Form.Control type='text' name='id' disabled  defaultValue = {this.props.id} placeholder='id'/>

                                    </Form.Group>
                                    <Form.Group controlId="code">
                                        <Form.Label  column={6}>Code</Form.Label>
                                        <Form.Control type='text' name='code'   defaultValue = {this.props.code} placeholder='Harvest code'/>

                                    </Form.Group>

                                    <Form.Group controlId="name">
                                        <Form.Label  column={6}>Name</Form.Label>
                                        <Form.Control type='text' name='name'  defaultValue={this.props.name} placeholder='Name'/>

                                    </Form.Group>

                                    <Form.Group controlId="harvestId">
                                        <Form.Label  column={6}>Mill</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.harvestId}>
                                            {this.state.harvests.map(harvest =>
                                                <option key={harvest.id} value={harvest.id}>{harvest.code}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Update Farm</Button>
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
