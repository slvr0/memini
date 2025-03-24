import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import TimePicker from "./time-picker.jsx";

import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  TextArea,
  Form
} from 'semantic-ui-react'

import { Input, Label } from 'semantic-ui-react';

const NewActivityModal = forwardRef((props, ref) => { 

    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(0);

    const formRef = useRef(); 

    useImperativeHandle(ref, () => ({
        onShowModal : (startTime) =>  showModal(startTime),
        onCloseModal : () => {
            displayData();
        }
    }));


    const showModal = (startTime) => {
        //useReducer on this ?
        setStartTime(startTime);
        setIsOpen(true);
    }

    const onSetValues = (values) => {
        //collect field data , return values and close modal. input comes in props
    } 

    const onInputChange = (event, data) => {
        


    }
    const displayData = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
    
        const formData = new FormData(formRef.current); // Create a FormData object with the form
       
       
    }

    return (
      <>
        <Modal
        dimmer={'inverted'}
        open={isOpen}
        onClose={() => {setIsOpen(false)} } /*fire some callback instead*/
         className={'memini-modal-compact'}
        >
        <ModalHeader className='memini-font'>Create new activity</ModalHeader>
        <ModalContent className={'memini-modal-compact'}>
                
                <Form ref={formRef} className="custom-form">
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eight wide column">              
                            <label className="memini-modal-label">Title</label>   
                            <Input fluid placeholder="Enter Title" className="memini-modal-input-field" />                                 
                        </div>

                        <div className="eight wide column">
                        <label className="memini-modal-label">Type</label>   
                        <Input fluid placeholder="Enter activity type" className="memini-modal-input-field" />   
                        </div>  
                    </div>  

                    <div className="ui row">
                        <div className="eight wide column">
                            <TimePicker label={'Start'} labelClassName='memini-modal-label'></TimePicker>                     
                        </div>

                        <div className="eight wide column">
                            <TimePicker label={'End'} labelClassName='memini-modal-label'></TimePicker>
                        </div>
                    </div>

                    <div className="ui row">
                        <div className="sixteen wide column">
                            <div className="eight wide right floated column">
                                
                                <label className="memini-modal-label">Description</label>
                                <Input fluid placeholder="Enter activity description" className="memini-modal-input-field memini-modal-input-area" />                  
                            </div>
                        </div>
                    </div>

                    <div className="ui row">
                        <button className="ui button compact mini default" onClick={() => {}}> Get Ref </button>
                    </div>
                </div>
                </Form>
        </ModalContent>
        <ModalActions>
          <Button className={"ui button mini basic"} onClick={() => {}}>
            Cancel
          </Button>
          <Button type="submit" className={"ui button mini memini-affirmative-button"} onClick={(e) => {displayData(e)}}>
            Save
          </Button>          
        </ModalActions>
      </Modal>
     

      </>
    );
   
  });

export default NewActivityModal;