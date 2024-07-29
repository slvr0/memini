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
        const computedTop = 12 / (this.props.content.startTime / 60.0).toString();
        
        const blockHeightStylingComputed    = 'calc(100%/' + computedHeight + ')';
        const blockTopStylingComputed       = 'calc(100%/' + computedTop + ')';
    
        const className = `w-64 contentBlock ${backgroundColor} rounded-lg shadow-lg backdrop-blur filter sepia ${this.props.content.attached ? 'attached-task' : ''}`;
        const style = {
            height: this.props.content.attached ? blockHeightStylingComputed : '',
            top: this.props.content.attached ? blockTopStylingComputed : '0'
        }     

        return (
            <>  
                <div draggable className={className}

                onDragStart={(event) => this.props.onDrag(this)}
                style={style}>
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








