import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Map from "../MapContainer";


export class AddFieldModal extends Component {

    constructor(props){
        super(props);

        this.state = { farms: [], snackbaropen: false, snackbarmsg: '', lat: 45.38332153627205, lng: -75.3372987731628};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refresh() {
        fetch('http://localhost:8000/farms').then(response => response.json()).then(data => {
            data = data.data;
            this.setState({
                farms: data
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
        fetch('http://localhost:8000/fields', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event.target.code.value,
                point: { "type": "Point", "coordinates": [event.target.lng.value, event.target.lat.value]},
                farmId: event.target.farmId.value
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
        const {lat, lng} = this.state;
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
                            Add Field
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

                                       <Form.Group controlId="lng">
                                           <Form.Label  column={6}>Lng</Form.Label>
                                           <Form.Control type='text' name='lng' placeholder='Lng' onChange={(e) => this.setState({lng:parseFloat(e.target.value)})}/>

                                       </Form.Group>
                                       <Form.Group controlId="lat">
                                           <Form.Label  column={6}>Lat</Form.Label>
                                           <Form.Control type='text' name='lat' placeholder='Lat' onChange={(e) => this.setState({lat:parseFloat(e.target.value)})}/>

                                       </Form.Group>


                                       <Form.Group controlId="farmId">
                                           <Form.Label  column={6}>Farm</Form.Label>
                                           <Form.Control as="select">
                                               {this.state.farms.map(farm =>
                                                   <option key={farm.id} value={farm.id}>{farm.name}</option>
                                               )}
                                           </Form.Control>
                                       </Form.Group>

                                       <Form.Group>
                                           <Button variant='primary' type='submit'>Add Field</Button>
                                       </Form.Group>
                                   </Form>
                               </Col>
                               <Col sm={6}>
                                   <Map items={[]}
                                        lat={lat}
                                        lng={lng}
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDu1X-qRDG3h5tbKZwC9QgqpNWaE54BXs0`}
                                        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                                        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                                        mapElement={<div style={{ height: `100%`, width: `100%` }} />}/>
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
