import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from "react-bootstrap";
import {AddFarmModal} from "./AddFarmModal";
import {EditFarmModel} from "./EditFarmModal";
import {URL_BACKEND} from "../../constants";

export class Farm extends Component {

    constructor(props) {
        super(props);
        this.state = {farms: []}
    }

    
    refreshList() {
       fetch(`${URL_BACKEND}/farms`).then(response => response.json()).then(data => {
           data = data.data;
           this.setState({
               farms: data,
               addModalShow: false,
               editModalShow: false
           })
       })
    }

    deleteFarm(id) {
        if(window.confirm('Are you sure?')){
            fetch(`${URL_BACKEND}/farms/`+id, {
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
        const {farms, id, code, name, harvestId} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let updateList = () => this.refreshList();
        return(
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                Farm Id
                            </th>
                            <th>
                                Farm Code
                            </th>
                            <th>
                                Farm Name
                            </th>
                            <th>
                                Harvest Code
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {farms.map(farm =>
                            <tr key={farm.id}>
                                <td>{farm.id}</td>
                                <td>{farm.code}</td>
                                <td>{farm.name}</td>
                                <td>{farm.harvest.code}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info' onClick={()=>this.setState({
                                            editModalShow: true,
                                            id: farm.id,
                                            code: farm.code,
                                            name: farm.name,
                                            harvestId: farm.harvestId
                                        })}>Edit</Button>
                                        <Button className='mr-2' variant='danger' onClick={()=> this.deleteFarm(farm.id)}>Delete</Button>
                                        <EditFarmModel
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            updatelist={updateList}
                                            id={id}
                                            code={code}
                                            harvestId={harvestId}
                                            name={name}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=> this.setState({addModalShow: true})}> Add Farm</Button>
                </ButtonToolbar>
                <AddFarmModal show={this.state.addModalShow} onHide={addModalClose} updatelist={updateList}/>

            </div>
        )

    }
}
