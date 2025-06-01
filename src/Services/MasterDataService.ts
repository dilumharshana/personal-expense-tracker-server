// src/services/masterDataService.ts
import { apiClient } from "../utils/apiClient";
import { API_ENDPOINTS } from "../config/api";
import { MasterData } from "../types";

export const masterDataService = {
  getMasterData: async (): Promise<MasterData[]> => {
    return await apiClient.get<MasterData[]>(API_ENDPOINTS.MASTER_DATA);
  },

  createMasterData: async (data: { title: string }): Promise<MasterData> => {
    return await apiClient.post<MasterData>(API_ENDPOINTS.MASTER_DATA, data);
  },

  updateMasterData: async (
    id: string,
    data: { title: string }
  ): Promise<MasterData> => {
    return await apiClient.put<MasterData>(
      `${API_ENDPOINTS.MASTER_DATA}/${id}`,
      data
    );
  },

  deleteMasterData: async (id: string): Promise<void> => {
    return await apiClient.delete<void>(`${API_ENDPOINTS.MASTER_DATA}/${id}`);
  }
};
