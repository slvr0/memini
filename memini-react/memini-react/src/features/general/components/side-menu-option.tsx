
import LucidIconButton from "../../../lucid/lucid-button-icon"
import { LucideProps } from "lucide-react";
import { Typography, Box } from "@mui/material";

interface SideMenuOptionProps {
    className? : string;
    isExpanded : boolean;
    optionText: string;
    icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    isActive?: boolean;
    onClick?: Function;    
}

const SideMenuOption : React.FC<SideMenuOptionProps> = (props) => {    
    return (      
            <div className={`${props.isActive ? 'bg-gray-100' : '' } grid grid-cols-12 hover:bg-gray-100  rounded-lg hover:cursor-pointer mt-2 ml-2 mr-2 px-2 py-2`}
               {...(props.onClick ? { onClick: () => props.onClick?.() } : {})}            
            > 
                <div className={`${props.isExpanded ? "col-span-2" : "col-span-12"} flex items-center ${props.className ?? ''}`}>
                    <LucidIconButton   
                        icon={props.icon}    
                        className="ml-1"                                            
                        size={20}                         
                        opacity={props.isActive ? 0.95 : 0.75}                         
                        palette="main"                         
                        borderProfile="rounded"                         
                        highlightBackgroundOnHover={false}
                        highlightBorderOnHover={false}
                        displayBorder={false}                                                                     
                        onClick={(e) => e.stopPropagation()}
                    /> 
                </div>

                {
                    props.isExpanded && 
                    <div className="col-span-10 flex items-center">
                        <Typography variant="subtitle2" className="px-4 opacity-80 mx-0 !m-auto">
                            {props.optionText}
                        </Typography>
                    </div>
                }
            </div>  
    );
};

export default SideMenuOption;