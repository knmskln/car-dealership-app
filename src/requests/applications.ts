import axios from "axios";

export const findApplications = (): Promise<any> => {
  return axios.get('http://localhost:8080/api/orders');
}

export const createApplication = (application: any): Promise<any> => {
  return axios.post('http://localhost:8080/api/orders', application);
}

export const changeApplicationStatus = (orderId: number, statusId: number): Promise<any> => {
  return axios.patch(`http://localhost:8080/api/orders`, {orderId, statusId});
}
