import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from "react-bootstrap";
import {AddMillModel} from "./AddMillModal";
import {EditMillModel} from "./EditMillModal";
import {URL_BACKEND} from "../../constants";

export class Mill extends Component {

    constructor(props) {
        super(props);
        this.state = {mills: []}
    }

    
    refreshList() {
       fetch( `${URL_BACKEND}/mills`).then(response => response.json()).then(data => {
           data = data.data;
           this.setState({
               mills: data,
               addModalShow: false,
               editModalShow: false
           })
       })
    }

    deleteMill(id) {
        if(window.confirm('Are you sure?')){
            fetch(`${URL_BACKEND}/mills/${id}`, {
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
        const {mills, id, name} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let updateList = () => this.refreshList();
        return(
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>
                                Mill Id
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
                        {mills.map(mill =>
                            <tr key={mill.id}>
                                <td>{mill.id}</td>
                                <td>{mill.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info' onClick={()=>this.setState({editModalShow: true, id: mill.id, name: mill.name})}>Edit</Button>
                                        <Button className='mr-2' variant='danger' onClick={()=> this.deleteMill(mill.id)}>Delete</Button>
                                        <EditMillModel
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            updatelist={updateList}
                                            id={id}
                                            name={name}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=> this.setState({addModalShow: true})}> Add Mill</Button>
                </ButtonToolbar>
                <AddMillModel show={this.state.addModalShow} onHide={addModalClose} updatelist={updateList}/>

            </div>
        )

    }
}
