import { create } from "zustand";
import { getSpecialization } from "../api/specialization";

const useSpecialization = create((set) => ({
  specialization: [],
  fetchGetSpecialization: async () => {
    try {
      const res = await getSpecialization();
      console.log("getSpecial", res.data);
      if (res && res.status === 200) {
        set({ specialization: res.data });
      }
    } catch (err) {
      console.error("Error fetching spezilation", err);
    }
  },
}));
export default useSpecialization;
