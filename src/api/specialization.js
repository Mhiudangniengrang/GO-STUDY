import axiosClient from "../config/axiosClient";

const getSpecialization = () => {
  return axiosClient.get("/api/Specialization/GetAllSpecialization");
};
export { getSpecialization };
