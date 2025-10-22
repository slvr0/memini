import { setUserLocation, getUserLocation } from "../../../services/user-services";
import { IPositionState } from "@/interfaces/common-interfaces.js";
import { ApiResponse } from '@/interfaces/api-response';

export async function setUserLocationApi(location: IPositionState): Promise<ApiResponse<IPositionState>> { 
  return await setUserLocation(location).then(response => response.data).catch(e => console.log(e));
}

export async function getUserLocationApi(): Promise<ApiResponse<IPositionState>> { 
  return await getUserLocation().then(response => response.data).catch(e => console.log(e));
}
