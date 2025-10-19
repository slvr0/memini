import { fetchEventApiData, cleanupOldApiData, getEvents } from "../../../services/event-services"

import type { ApiResponse } from "../../../interfaces/api-response";

import { addUserTask, deleteUserTask, getUserTasks, saveUserTask, getFavoritesAndRecentTasks } from "../../../services/usertask-service";

export async function getEventsFromAll(): Promise<ApiResponse<any>> {
    return await getEvents().then(response => response.data).catch(e => console.log(e));
}

