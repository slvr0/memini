import "../css/general-header-segment.css";    
const GenericHeaderSegment = (props: any) => {  
    const headerText = props.headerText;
    const headerSubText = props.headerSubText;
    const headerCentered = props.headerCentered ?? false;

    return (
      <>    
        <div className="relative ">
        <div className="absolute top-0 left-0 w-16 h-1 bg-red-300 rounded-full ml-1"></div>
        </div>
                <div className="generic-segment-page-header-container">
                    <h4 className="generic-segment-page-header">
                        {headerText}
                    </h4>
                    <div className="ui text generic-segment-page-subheader">
                        {headerSubText}
                    </div>
                </div>
    
        </>
      
    );

}

export default GenericHeaderSegment;








