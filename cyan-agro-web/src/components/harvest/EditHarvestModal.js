import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {URL_BACKEND} from "../../constants";

export class EditHarvestModel extends Component {

    constructor(props){
        super(props);

        this.state = { mills: [], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refresh() {
        fetch(`${URL_BACKEND}/mills`).then(response => response.json()).then(data => {
            data = data.data;
            this.setState({
                mills: data
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
        fetch(`${URL_BACKEND}/harvests/${event.target.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: event.target.id.value,
                code: event.target.code.value,
                startDate: event.target.startDate.value,
                endDate: event.target.endDate.value,
                millId: event.target.millId.value
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

    formatDate(date) {

        if(date !== null && date !== undefined){
            let newDate = date.split('T')[0];
            return newDate;
        } else {
            return '';
        }
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
                            Edit Harvest
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

                                    <Form.Group controlId="startDate">
                                        <Form.Label  column={6}>Start Date</Form.Label>
                                        <Form.Control type='date' name='startDate'  defaultValue={this.formatDate(this.props.startDate)} placeholder='Start Date' onChange={(e) => console.log(e.target.value)}/>

                                    </Form.Group>
                                    <Form.Group controlId="endDate">
                                        <Form.Label  column={6}>End Date</Form.Label>
                                        <Form.Control type='date' name='endDate'  defaultValue={this.formatDate(this.props.endDate)} placeholder='End Date'/>
                                    </Form.Group>

                                    <Form.Group controlId="millId">
                                        <Form.Label  column={6}>Mill</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.millId}>
                                            {this.state.mills.map(mill =>
                                                <option key={mill.id} value={mill.id}>{mill.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Update Harvest</Button>
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
