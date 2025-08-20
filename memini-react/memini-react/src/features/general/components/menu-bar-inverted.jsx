import MeminiIconButton from "./memini-icon-button.jsx"
import Divider from '@mui/material/Divider';

const MenuBarInverted = (props) => {  
  const headerText = props.headerText;
  const subHeaderTtext = props.subHeaderText; 

    return (
      <div className="memini-container-section">
  {/* Header Row */}
  <div className="flex items-center justify-between p-4">
    
    {/* Left: Title */}
    <div className="flex items-start gap-4">
      <div className="w-1 h-10 bg-red-200 rounded-sm mt-1"></div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{headerText}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {subHeaderTtext}
        </p>
      </div>
    </div>

    {/* Right: Buttons + Icon */}
    <div className="items-center flex-1 flex justify-end gap-4 ml-1 mr-1">
         {props.children}
    </div>


  </div>
    
  {/* Menu Row */}
  <div className="bg-blue-200 py-1"></div>
  </div>

    );
  };

  export default MenuBarInverted;