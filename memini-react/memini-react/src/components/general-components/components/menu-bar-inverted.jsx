import MeminiIconButton from "./memini-icon-button.jsx"

const MenuBarInverted = (props) => {
    return (
      <div className="memini-container-section">
  {/* Header Row */}
  <div className="flex items-center justify-between p-4">
    
    {/* Left: Title */}
    <div className="flex items-start gap-4">
      <div className="w-1 h-10 bg-red-200 rounded-sm mt-1"></div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Task Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your tasks with quick access to tools and settings.
        </p>
      </div>
    </div>

    {/* Center: Children */}
    <div className="flex-1 flex justify-center">
      <div className="text-center">
        {props.children}
      </div>
    </div>

    {/* Right: Buttons + Icon */}
    <div className="items-center flex-1 flex justify-center gap-4">
      <MeminiIconButton
        iconText="Add Task"
        iconColor="white"
        iconType="add"
        inverted={false}
        onClick={() => console.log("Add Task")}
      />
      <MeminiIconButton
        iconText="Edit Task"
        iconColor="white"
        iconType="edit"
        inverted={false}
        onClick={() => console.log("Edit Task")}
      />
      <MeminiIconButton
        iconText="Settings"
        iconColor="white"
        iconType="settings"
        inverted={false}
        onClick={() => console.log("Settings")}
      />   
    </div>

    <span className="material-icons text-3xl text-blue-400 cursor-pointer hover:text-miLight">
        menu
      </span>
  </div>

  {/* Menu Row */}
  <div className="bg-blue-200 py-1"></div>
</div>

    );
  };

  export default MenuBarInverted;