import {defineStore} from 'pinia';
import * as applicationsRequests from "@/requests/applications";
import {StatisticType} from "@/types/statistic";

export const useStatisticsStore = defineStore({
  id: 'statistics',
  state: () => ({
    statistics: [] as StatisticType[],
    isStatisticsFetching: false,
    isSpecificStatisticFetching: false,
  }),
  actions: {
    roundToHalf(num: number) {
      return Math.round(num * 2) / 2;
    },
    async findStatistics(): Promise<any> {
      this.statistics = [];
      let applicationsResp;
      this.isStatisticsFetching = true;
      try {
        applicationsResp = await applicationsRequests.findApplications();
        const applications = applicationsResp.data;
        applications.forEach((application: any) => {
          if(this.statistics.find(elF => elF.car.name === `${application.car.mark} ${application.car.model}`)){
            if(application.value){
              const i = this.statistics
                .findIndex(elF => elF.car.name === `${application.car.mark} ${application.car.model}`);
              this.statistics[i].ratesAmount++;
              if(application.value == 1){
                this.statistics[i].rating.one++;
              }
              if(application.value == 2){
                this.statistics[i].rating.two++;
              }
              if(application.value == 3){
                this.statistics[i].rating.three++;
              }
              if(application.value == 4){
                this.statistics[i].rating.four++;
              }
              if(application.value == 5){
                this.statistics[i].rating.five++;
              }
            }
          } else {
            this.statistics.push({
              car: {
                name: `${application.car.mark} ${application.car.model}`,
              },
              rating: {
                one: application.value == '1' ? 1 : 0,
                two: application.value == '2' ? 1 : 0,
                three: application.value == '3' ? 1 : 0,
                four: application.value == '4' ? 1 : 0,
                five: application.value == '5' ? 1 : 0,
              },
              averageRate: application.value,
              ratesAmount: application.value ? 1 : 0,
            });
          }
        });
        this.statistics = this.statistics.map(el => {
          let divider = 0;
          if(el.rating.five){
            divider+=el.rating.five;
          }
          if(el.rating.four){
            divider+=el.rating.four;
          }
          if(el.rating.three){
            divider+=el.rating.three;
          }
          if(el.rating.two){
            divider+=el.rating.two;
          }
          if(el.rating.one){
            divider+=el.rating.one;
          }
          const averageRate =
            (5*el.rating.five + 4*el.rating.four + 3*el.rating.three + 2*el.rating.two + el.rating.one) / divider;
          return {...el, averageRate: this.roundToHalf(averageRate) };
        })
        this.isStatisticsFetching = false;
        console.log(this.statistics);
        return applications;
      } catch (e: any) {
        this.isStatisticsFetching = false;
        throw new Error(e);
      }
    },
    async findStatistic(carName: string): Promise<any> {
      this.isSpecificStatisticFetching = true;
      await this.findStatistics();
      const statistic = this.statistics.find((el: any) => el.car.name === carName);
      this.isSpecificStatisticFetching = false;
      return statistic;
    }

  }
});
