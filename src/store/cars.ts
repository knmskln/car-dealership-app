import {defineStore} from 'pinia';
import {CarType} from "@/types/car";
import * as carsRequests from "@/requests/cars";
import {DateType} from "@/types/date";
import {DealerCenterType} from "@/types/dealer-center";

export const useCarsStore = defineStore({
  id: 'cars',
  state: () => ({
    cars: [] as CarType[],
    availableSlots: [] as DateType[],
    availableCenters: [] as DealerCenterType[],
    isCarsFetching: false,
    isCarCreateFetching: false,
    isCarEditFetching: false,
    isCarDeleteFetching: false,
    createNewApplicationDialogMode: false,
    addNewCarDialogMode: false,
  }),
  actions: {
    setCars(cars: CarType[]) {
      this.cars = cars;
    },
    async addCar(car: CarType) {
      try {
        this.isCarCreateFetching = true;
        await carsRequests.addCar(car);
        this.cars.push(car);
        this.addNewCarDialogMode = false;
        this.isCarCreateFetching = false;
      } catch (e: any) {
        console.log(e);
        this.isCarCreateFetching = false;
        throw new Error(e.toString());
      }
    },
    async editCar(car: CarType) {
      try {
        this.isCarEditFetching = true;
        await carsRequests.editCar(car);
        const position = this.cars.findIndex(carForEdit => carForEdit.id === car.id);
        this.cars[position] = car;
        this.isCarEditFetching = false;
      } catch (e: any) {
        console.log(e);
        this.isCarEditFetching = false;
        throw new Error(e.toString());
      }
    },
    async deleteCar(car: CarType) {
      try {
        this.isCarDeleteFetching = true;
        await carsRequests.deleteCar(car);
        const position = this.cars.findIndex(carForRemove => carForRemove.id === car.id);
        if (position) this.cars.splice(position, 1);
        this.isCarDeleteFetching = false;
      } catch (e: any) {
        console.log(e);
        this.isCarDeleteFetching = false;
        throw new Error(e.toString());
      }
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
    async getSlots(): Promise<any> {
      let slotsResp;
      try {
        slotsResp = await carsRequests.getSlots();
        this.availableSlots = slotsResp.data;

        return slotsResp.data;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    async getCenters(): Promise<any> {
      let centersResp;
      try {
        centersResp = await carsRequests.getCenters();
        this.availableCenters = centersResp.data;

        return centersResp.data;
      } catch (e: any) {
        throw new Error(e);
      }
    },
  }
});
