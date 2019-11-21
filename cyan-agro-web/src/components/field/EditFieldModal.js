import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Map from "../MapContainer";
import {URL_BACKEND} from "../../constants";

export class EditFieldModel extends Component {

    constructor(props){
        super(props);

        this.state = { farms: [], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refresh() {
        fetch(`${URL_BACKEND}/farms`).then(response => response.json()).then(data => {
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
        fetch( `${URL_BACKEND}/fields/${event.target.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: event.target.id.value,
                code: event.target.code.value,
                point: { "type": "Point", "coordinates": [event.target.lng.value, event.target.lat.value]},
                farmId: event.target.farmId.value
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
        const {lat, lng} = this.state;
        console.log('lng')
        console.log(lng)

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
                            Edit Field
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
                                        <Form.Control type='text' name='code'   defaultValue = {this.props.code} placeholder='Field code'/>

                                    </Form.Group>

                                    <Form.Group controlId="lng">
                                        <Form.Label  column={6}>Lng</Form.Label>
                                        <Form.Control type='text' name='lng' defaultValue = {this.props.point ? this.props.point.coordinates[0] : 0} placeholder='Lng'
                                        onChange={(e) => {
                                            console.log('e.target.value')
                                            console.log(e.target.value)
                                            this.setState({lng: parseFloat(e.target.value)})
                                        }}
                                        />

                                    </Form.Group>
                                    <Form.Group controlId="lat">
                                        <Form.Label  column={6}>Lat</Form.Label>
                                        <Form.Control type='text' name='lat' defaultValue = {this.props.point ? this.props.point.coordinates[1] : 0} placeholder='Lat'
                                        onChange={(e) => this.setState({lat: parseFloat(e.target.value)})}/>

                                    </Form.Group>

                                    <Form.Group controlId="farmId">
                                        <Form.Label  column={6}>Mill</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.farmId}>
                                            {this.state.farms.map(farm =>
                                                <option key={farm.id} value={farm.id}>{farm.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Update Field</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Map items={[]}
                                     lat={lat ? lat : this.props.point ? this.props.point.coordinates[1] : 0}
                                     lng={lng ? lng : this.props.point ? this.props.point.coordinates[0] : 0}
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
