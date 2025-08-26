import { Stack } from "@mui/material";
import { useTaskManager } from "../../tasks/utils/task-manager";
import { MuiMenuCard } from "../../general/components/mui-menu-card";
import {
  AddCircleOutline,
  Repeat,
  EventNote,
  NotificationsActive,
  Label,
  CheckCircleOutline
} from "@mui/icons-material";

const iconFontSize = "large";

const cards = [
  { title: "Create New Task", desc: "Create a new activity.", icon: <AddCircleOutline fontSize={iconFontSize} />, action: "new" },
  { title: "Create Recurring Task", desc: "Set up repeating activities.", icon: <Repeat fontSize={iconFontSize}/>, action: "recurring" },
  { title: "View Upcoming Tasks", desc: "See upcoming tasks.", icon: <EventNote fontSize={iconFontSize}/>, action: "upcoming" },
  { title: "Set Reminders", desc: "Get notifications before tasks.", icon: <NotificationsActive fontSize={iconFontSize}/>, action: "reminders" },
  { title: "Categorize Tasks", desc: "Organize tasks by category.", icon: <Label fontSize={iconFontSize}/>, action: "categorize" },
  { title: "Completed & Archive", desc: "Review finished tasks.", icon: <CheckCircleOutline fontSize={iconFontSize}/>, action: "archive" },
];

export default function ManageTasksTab({ modifyTaskRef }: { modifyTaskRef: React.RefObject<any> | null }) {
  const { clearSelectedTask } = useTaskManager();
  const onClickCreateNewActivity = () => {
    console.log(modifyTaskRef?.current)
    clearSelectedTask();
    if (modifyTaskRef && modifyTaskRef.current) {
        modifyTaskRef.current.setIsOpen(true);
    }
   }

  const handleClick = (action: string) => {
    switch(action) {
        case "new": onClickCreateNewActivity(); break;
    }

    console.log(`Clicked: ${action}`);
  };

  return (
    <>

    <div className="grid grid-cols-12 mt-10 content-center gap-4">   
        {
            cards.map((card, index) => (
                <div key={index} className="grid col-span-4 mx-4 my-4">
                    <MuiMenuCard
                        title={card.title}
                        description={card.desc}
                        icon={card.icon}
                        onClick={() => handleClick(card.action)}
                    />
                </div>
            ))
        }
           
    </div>

    </>
  );
}
