import React, { Component } from "react";
import '../index.css';
import { Form, Header, Modal, Button, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";

class ModalSimple extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            startTime: this.props.startTime || '',
            endTime: this.props.endTime || '',
            title: '',
            description: ''
        };
    }

    showModal = () => {
        this.setState({isOpen:true});
        
    }

    closeModal = () => {
        this.setState({isOpen:false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setSaved(true);
        this.closeModal();
    }

    componentDidMount() {
        window.addEventListener('openModal', this.showModal);
    }

    render() {
        return (
            <>
                <Modal blurred={true} as={Form} onSubmit={e => this.handleSubmit(e)} open={this.state.isOpen} size="tiny">
                <Header icon="pencil" content="This is my header" as="h2" />
                <Modal.Content>
                    <label>
                    Start Time:
                    <input 
                        type="time" 
                        name="startTime" 
                    />
                    </label>
                    <label>
                    End Time:
                    <input 
                        type="time" 
                        name="endTime" 
                    />
                    </label>
                    <label>
                    Title:
                    <input 
                        type="text" 
                        name="title" 
                    />
                    </label>
                    <label>
                    Description:
                    <input 
                        type="text" 
                        name="description" 
                    />
                    </label>
          
                </Modal.Content>
                <Modal.Actions>

                <Button type="submit" negative onClick={this.closeModal}>
                    Disagree
                </Button>
                <Button type="submit" positive onClick={this.closeModal}>
                    Agree
                </Button>

                </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default ModalSimple;