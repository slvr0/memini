import React, { Component, createRef, Fragment } from "react";
import BlockContent from "./block-content.jsx";

class Block extends Component{
    constructor(props){
        super(props); 
    }
    
    componentDidMount() {
      
    }

    setBlockContent() {

    }

    setBackgroundColorFromContentType(contentType) {
        switch(contentType) {
            case 'sport' : return 'bg-red-300';
            case 'chore' : return 'bg-yellow-300';
            case 'fun' : return 'bg-indigo-300';
            default : return '';
        }
    }

    setContentIcon(contentType) {
        switch(contentType) {
            case 'sport' : return 'bg-red-300';
            case 'chore' : return 'bg-yellow-300';
            case 'fun' : return 'bg-indigo-300';
            default : return '';
        }
    }

    render() { 

        let backgroundColor = '';
        if(this.props.content)
            backgroundColor = this.setBackgroundColorFromContentType(this.props.content.activityType);   

        const computedHeight = 12 / (this.props.sizeY / 60.0).toString();
    
        const blockHeightStylingComputed = 'calc(100%/' + computedHeight + ')';

        return (
            <>  
                <div draggable className={`w-64 contentBlock ${backgroundColor} rounded-lg shadow-lg backdrop-blur filter sepia`}

                onDragStart={(event) => this.props.onDrag(this)}
                style={{ height: 'calc(100%/4' }}>
                    {this.props.content ? (
                    <BlockContent draggable>             
                        {this.props.content}
                    </BlockContent>
                    ) : (
                    <Fragment>                
                        <p>No content available</p>
                    </Fragment>
                    )}
                </div>
        
            </>       
        );
    }
}

export default Block;








