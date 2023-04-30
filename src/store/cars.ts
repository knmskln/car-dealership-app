import {defineStore} from 'pinia';
import {CarType} from "@/types/car";
import * as carsRequests from "@/requests/cars";

export const useCarsStore = defineStore({
  id: 'cars',
  state: () => ({
    cars: [] as CarType[],
    isCarsFetching: false,
    createNewApplicationDialogMode: false,
    addNewCarDialogMode: false,
  }),
  actions: {
    setCars(cars: CarType[]) {
      this.cars = cars;
    },
    async addCar(car: CarType) {
      try {
        await carsRequests.addCar(car);
        this.cars.push(car);
      } catch (e: any) {
        console.log(e);
        throw new Error(e.toString());
      }
    },
    removeCar(car: CarType) {
      const position = this.cars.findIndex(carForRemove => carForRemove.id === car.id);
      if (position) this.cars.splice(position, 1);
    },
    toggleAddNewCarDialogMode(mode: boolean){
      this.addNewCarDialogMode = mode;
    },
    async getCars(): Promise<any> {
      let carsResp;
      this.isCarsFetching = true;
      try {
        carsResp = await carsRequests.getCars();
        console.log(carsResp)
        this.cars = carsResp.data;
        this.isCarsFetching = false;
        return carsResp;
      } catch (e: any) {
        throw new Error(e);
      }
    },
  }
});
