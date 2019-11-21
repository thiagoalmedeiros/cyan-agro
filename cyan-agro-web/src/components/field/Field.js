import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from "react-bootstrap";
import {AddFieldModal} from "./AddFieldModal";
import {EditFieldModel} from "./EditFieldModal";
import {URL_BACKEND} from "../../constants";

export class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {fields: []}
    }

    
    refreshList() {
       fetch(`${URL_BACKEND}/fields`).then(response => response.json()).then(data => {
           data = data.data;
           this.setState({
               fields: data,
               addModalShow: false,
               editModalShow: false
           })
       })
    }

    deleteField(id) {
        if(window.confirm('Are you sure?')){
            fetch(`${URL_BACKEND}/fields/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                if(res.status === 204) {
                    this.refreshList();
                    this.setState({snackbaropen: true, snackbarmsg: 'delete successfully!'})
                } else {
                    this.setState({snackbaropen: true, snackbarmsg: 'error performing delete!'})
                }
            });
        }
    }

    componentDidMount() {
        this.refreshList();
    }
    render() {
        const {fields, id, code, point, farmId} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let updateList = () => this.refreshList();
        return(
            <div >
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                Field Id
                            </th>
                            <th>
                                Field Code
                            </th>
                            <th>
                                Lng
                            </th>
                            <th>
                                Lat
                            </th>
                            <th>
                                Farm Name
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(field =>
                            <tr key={field.id}>
                                <td>{field.id}</td>
                                <td>{field.code}</td>
                                <td>{field.point.coordinates[0]}</td>
                                <td>{field.point.coordinates[1]}</td>
                                <td>{field.farm.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info' onClick={()=>this.setState({
                                            editModalShow: true,
                                            id: field.id,
                                            code: field.code,
                                            point: field.point,
                                            farmId: field.farmId
                                        })}>Edit</Button>
                                        <Button className='mr-2' variant='danger' onClick={()=> this.deleteField(field.id)}>Delete</Button>
                                        <EditFieldModel
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            updatelist={updateList}
                                            id={id}
                                            code={code}
                                            farmId={farmId}
                                            point={point}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=> this.setState({addModalShow: true})}> Add Field</Button>
                </ButtonToolbar>
                <AddFieldModal show={this.state.addModalShow} onHide={addModalClose} updatelist={updateList}/>

            </div>
        )

    }
}
