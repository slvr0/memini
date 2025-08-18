import api from "./api-client.js";
const controllerSyntax = 'UserTask';

export const getUserTasks = (data) => api.post(controllerSyntax + '/GetTasksForDate' , data);
export const saveUserTask = (data) => api.post(controllerSyntax + "/SaveUserTask", data);
export const addUserTask = (data) => api.post(controllerSyntax + '/AddUserTask', data);
export const deleteUserTask = (data) => api.post(controllerSyntax + '/DeleteUserTask', data);