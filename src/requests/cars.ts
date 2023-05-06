import {cars} from "@/mocks/cars";
import {CarType} from "@/types/car";
import axios from "axios";

export const addCar = (carData: CarType): Promise<void> => {
  return axios.post('http://localhost:8080/api/cars', carData);
}

export const getCars = (): Promise<any> => {
  return axios.get('http://localhost:8080/api/cars');
  // return new Promise((resolve, reject) => {
  //   const carsResp = cars;
  //   console.log(carsResp);
  //   if(cars) setTimeout(resolve, 1000, carsResp);
  //   else setTimeout(reject, 1000, {message: 'could not receive cars info'});
  // });
}

export const getSlots = (): Promise<any> => {
  return axios.get('http://localhost:8080/api/slots');
}

export const getCenters = (): Promise<any> => {
  return axios.get('http://localhost:8080/api/centers');
}
