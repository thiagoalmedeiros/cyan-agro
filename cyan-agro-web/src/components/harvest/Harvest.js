import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from "react-bootstrap";
import {AddHarvestModal} from "./AddHarvestModal";
import {EditHarvestModel} from "./EditHarvestModal";


export class Harvest extends Component {

    constructor(props) {
        super(props);
        this.state = {harvests: []}
    }

    
    refreshList() {
       fetch('http://localhost:8000/harvests').then(response => response.json()).then(data => {
           data = data.data;
           this.setState({
               harvests: data,
               addModalShow: false,
               editModalShow: false
           })
       })
    }

    deleteHarvest(id) {
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:8000/harvests/'+id, {
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
        const {harvests, id, code, startDate, endDate, millId} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let updateList = () => this.refreshList();
        return(
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                Harvest Id
                            </th>
                            <th>
                                Harvest Code
                            </th>
                            <th>
                                Start Date
                            </th>
                            <th>
                                End Date
                            </th>
                            <th>
                                Mill Name
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {harvests.map(harvest =>
                            <tr key={harvest.id}>
                                <td>{harvest.id}</td>
                                <td>{harvest.code}</td>
                                <td>{harvest.startDate}</td>
                                <td>{harvest.endDate}</td>
                                <td>{harvest.mill.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info' onClick={()=>this.setState({
                                            editModalShow: true,
                                            id: harvest.id,
                                            code: harvest.code,
                                            startDate: harvest.startDate,
                                            endDate: harvest.endDate,
                                            millId: harvest.millId
                                        })}>Edit</Button>
                                        <Button className='mr-2' variant='danger' onClick={()=> this.deleteHarvest(harvest.id)}>Delete</Button>
                                        <EditHarvestModel
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            updatelist={updateList}
                                            id={id}
                                            code={code}
                                            millId={millId}
                                            endDate={endDate}
                                            startDate={startDate}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=> this.setState({addModalShow: true})}> Add Harvest</Button>
                </ButtonToolbar>
                <AddHarvestModal show={this.state.addModalShow} onHide={addModalClose} updatelist={updateList}/>

            </div>
        )

    }
}
