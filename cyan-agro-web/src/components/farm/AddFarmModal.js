import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {URL_BACKEND} from "../../constants";

export class AddFarmModal extends Component {

    constructor(props){
        super(props);

        this.state = { harvests: [], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refresh() {
        fetch(`${URL_BACKEND}/harvests`).then(response => response.json()).then(data => {
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
        fetch(`${URL_BACKEND}/farms`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event.target.code.value,
                name: event.target.name.value,
                harvestId: event.target.harvestId.value
            })
        }).then(res => res.json()).then((result) => {
            this.setState({snackbaropen: true, snackbarmsg: result.data.message}, ()=>{
                this.props.updatelist();
            });

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
                            Add Farm
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                           <Row>
                               <Col sm={6}>
                                   <Form onSubmit={this.handleSubmit}>
                                       <Form.Group controlId="code">
                                           <Form.Label  column={6}>Code</Form.Label>
                                           <Form.Control type='text' name='code' placeholder='Farm code'/>

                                       </Form.Group>

                                       <Form.Group controlId="name">
                                           <Form.Label  column={6}>name</Form.Label>
                                           <Form.Control type='text' name='name' placeholder='Name'/>

                                       </Form.Group>

                                       <Form.Group controlId="harvestId">
                                           <Form.Label  column={6}>Harvest</Form.Label>
                                           <Form.Control as="select">
                                               {this.state.harvests.map(harvest =>
                                                   <option key={harvest.id} value={harvest.id}>{harvest.code}</option>
                                               )}
                                           </Form.Control>
                                       </Form.Group>

                                       <Form.Group>
                                           <Button variant='primary' type='submit'>Add Farm</Button>
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
