import React, {Component} from 'react';
import Map from './MapContainer';
import {Button, Col, Form, Row} from "react-bootstrap";
import {URL_BACKEND} from "../constants";

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {fields: [], lat: 0, lng: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    fetchLocations() {
        fetch(`${URL_BACKEND}/fields`).then(response => response.json()).then(data => {
            const fields = data.data;
            this.setState({
                fields: fields
            })

        })
    }

    componentDidMount() {
        this.fetchLocations();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
            })
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        let url = new URL(`${URL_BACKEND}/dashboard`),
            params = {
                millName: event.target.millName.value,
                startDate: event.target.startDate.value,
                endDate: event.target.endDate.value,
                harvestCode: event.target.harvestCode.value,
                farmName: event.target.farmName.value,
                farmCode: event.target.farmCode.value,
                fieldCode: event.target.fieldCode.value,
            };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url).then(response => response.json()).then(data => {
            data = data.data;
            this.setState({
                fields: data
            })
        });

    }

    render() {
        const {fields, lat, lng} = this.state;
        return(
            <div style={{width: '100%', height: '100%'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row sm={12}>
                        <Col sm={3}>
                            <Form.Group controlId="millName">
                                <Form.Label  column={6}>Mill Name</Form.Label>
                                <Form.Control type='text' name='millName' placeholder='Mill Name'/>

                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group controlId="startDate">
                                <Form.Label  column={6}>Harvest Start</Form.Label>
                                <Form.Control type='date' name='startDate' placeholder='Harvest Start'/>

                            </Form.Group>
                        </Col>

                        <Col sm={3}>
                            <Form.Group controlId="endDate">
                                <Form.Label  column={6}>Harvest End</Form.Label>
                                <Form.Control type='date' name='endDate' placeholder='Harvest End'/>

                            </Form.Group>
                        </Col>

                        <Col sm={3}>
                            <Form.Group controlId="harvestCode">
                                <Form.Label  column={6}>Harvest Code</Form.Label>
                                <Form.Control type='text' name='harvestCode' placeholder='harvest Code'/>

                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group controlId="farmName">
                                <Form.Label  column={6}>Farm Name</Form.Label>
                                <Form.Control type='text' name='farmName' placeholder='Farm Name'/>

                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group controlId="farmCode">
                                <Form.Label  column={6}>Farm Code</Form.Label>
                                <Form.Control type='text' name='farmCode' placeholder='Farm Code'/>

                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group controlId="fieldCode">
                                <Form.Label  column={6}>Field Code</Form.Label>
                                <Form.Control type='text' name='fieldCode' placeholder='Field Code'/>
                            </Form.Group>
                        </Col>

                        <Col sm={2}>
                            <Form.Group>
                                <Form.Label  column={6}> Filter</Form.Label>
                                <Button variant='primary' style={{width: `100%`}}  type='submit'>Filter</Button>
                            </Form.Group>
                        </Col>

                    </Row>
                </Form>
                <Map items={fields}
                     lat={lat}
                     lng={lng}
                     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDu1X-qRDG3h5tbKZwC9QgqpNWaE54BXs0`}
                     loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                     containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                     mapElement={<div style={{ height: `100%`, width: `100%` }} />}/>
            </div>)
    }
}
