
import { Fragment } from "react";
import LucidIconButton from "../../../../lucid/lucid-button-icon"
import {TaskLayoutOptionPanelProps} from '../../interfaces/task-interface'
import { SquarePen, Star, Trash2, Share2 } from "lucide-react";

const TaskLayoutOptionPanel : React.FC<TaskLayoutOptionPanelProps> = (props) => {  
    return(       
        <Fragment>       
            <LucidIconButton
            icon={SquarePen}
            size={props.iconSize || 14}
            opacity={props.iconOpacity || .8}
            palette="main"
            borderProfile={props.borderProfile || "rounded"}
            highlightBackgroundOnHover={true}
            highlightBorderOnHover={true}
            displayBorder={false}
            tooltip="Edit/Modify"
            onClick={() => console.log("Clicked Home")}
            /> 
            <LucidIconButton
            icon={Star}
            size={props.iconSize || 14}
            opacity={props.iconOpacity || .8}
            palette="main"
            borderProfile={props.borderProfile || "rounded"}
            highlightBackgroundOnHover={true}
            highlightBorderOnHover={true}
            displayBorder={false}
            tooltip="Add to favorites"
            onClick={() => console.log("Clicked Home")}
            /> 
            <LucidIconButton
            icon={Share2}
            size={props.iconSize || 14}
            opacity={props.iconOpacity || .8}
            palette="main"
            borderProfile={props.borderProfile || "rounded"}
            highlightBackgroundOnHover={true}
            highlightBorderOnHover={true}
            displayBorder={false}
            tooltip="Share"
            onClick={() => console.log("Clicked Home")}
            /> 
            <LucidIconButton
            icon={Trash2}
            size={props.iconSize || 14}
            opacity={props.iconOpacity || .8}
            palette="main"
            borderProfile={props.borderProfile || "rounded"}
            highlightBackgroundOnHover={true}
            highlightBorderOnHover={true}
            displayBorder={false}
            tooltip="Delete"
            onClick={() => console.log("Clicked Home")}
            />     
        </Fragment>                            
    )    
}

export default TaskLayoutOptionPanel;
