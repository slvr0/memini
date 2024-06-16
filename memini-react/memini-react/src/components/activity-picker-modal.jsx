import React, { Component, createRef } from "react";
import '../index.css';
import { Form, Header, Modal, Button, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";

class ActivityPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            startTime: this.props.startTime || '',
            endTime: this.props.endTime || '',
            title: '',
            description: ''
        };

        this.startTimeRef = createRef(null);
        this.endTimeRef = createRef(null);
        this.titleRef = createRef(null);
        this.descriptionRef = createRef(null);
    }

    showModal = () => {
        this.setState({isOpen:true});        
    }

    closeModal = () => {
        this.setState({isOpen:false});
    }

    
    handleCancel = (e) => {
        e.preventDefault();
        this.closeModal();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const startTime = this.startTimeRef.current.value;
        const endTime = this.endTimeRef.current.value;
        const title = this.titleRef.current.value;
        const description = this.descriptionRef.current.value;

        console.log(startTime, endTime, title, description);

        this.props.onSubmit(startTime, endTime, title, description);

        this.closeModal();
    }

    componentDidMount() {
        window.addEventListener('openModal', this.showModal);
    }



    render() {
        return (
            <>
                <Modal 
                    ref={(modalContent) => { this.modalContent = modalContent; }}
                    blurred={true} as={Form} 
                    onSubmit={e => this.handleSubmit(e)} 
                    open={this.state.isOpen} size="tiny">
                <Header icon="pencil" content="This is my header" as="h2" />
                <Modal.Content >
                    <label>
                    Start Time:
                    <input 
                        ref={this.startTimeRef}
                        type="time" 
                        name="startTime" 
                    />
                    </label>
                    <label>
                    End Time:
                    <input 
                        ref={this.endTimeRef}
                        type="time" 
                        name="endTime" 
                    />
                    </label>
                    <label>
                    Title:
                    <input 
                        ref={this.titleRef}
                        type="text" 
                        name="title" 
                    />
                    </label>
                    <label>
                    Description:
                    <input 
                        ref={this.descriptionRef}
                        type="text" 
                        name="description" 
                    />
                    </label>
          
                </Modal.Content>
                <Modal.Actions>

                <Button type="submit" negative onClick={this.handleCancel}>
                    Disagree
                </Button>
                <Button type="submit" positive onClick={this.handleSubmit}>
                    Agree
                </Button>

                </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default ActivityPickerModal;