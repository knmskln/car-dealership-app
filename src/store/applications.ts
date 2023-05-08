import {defineStore} from 'pinia';
import * as applicationsRequests from "@/requests/applications";
import {ApplicationType} from "@/types/application";

export const useApplicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [] as ApplicationType[],
    isApplicationsFetching: false,
    isApplicationCreating: false,
  }),
  actions: {
    setApplications(applications: ApplicationType[]) {
      this.applications = applications;
    },

    async findApplications(isAdmin: boolean, currentUserId: number): Promise<any> {
      let applicationsResp;
      this.isApplicationsFetching = true;
      try {
        applicationsResp = await applicationsRequests.findApplications();

        applicationsResp.data.sort(() => -1)
        applicationsResp.data.sort((a: any, b: any) => {
          if(a.status.name === 'APPROVED' && b.status.name !== 'APPROVED'){
            return -1;
          } else {
            return 1;
          }
        });
        applicationsResp.data.sort((a: any, b: any) => {
          if(a.status.name === 'IN_PROGRESS' && b.status.name !== 'IN_PROGRESS'){
            return -1;
          } else {
            return 1;
          }
        });

        this.applications = isAdmin ? applicationsResp.data : applicationsResp.data.filter((a: any) => a.user.id == currentUserId);
        this.isApplicationsFetching = false;
        return applicationsResp;
      } catch (e: any) {
        this.isApplicationsFetching = false;
        throw new Error(e);
      }
    },

    async createApplication(application: any): Promise<any>{
      let applicationResp;
      this.isApplicationCreating = true;
      try {
        applicationResp = await applicationsRequests.createApplication(application);
        this.isApplicationCreating = false;
        return applicationResp;
      } catch (e: any) {
        this.isApplicationCreating = false;
        throw new Error(e);
      }
    },

    async changeApplicationStatus(orderId: number, statusId: number, buttonNumber: number, index: number): Promise<any>{
      if(buttonNumber === 1){
        this.applications[index].isFirstButtonLoading = true;
      } else if(buttonNumber === 2) {
        this.applications[index].isSecondButtonLoading = true;
      } else {
        this.applications[index].isThirdButtonLoading = true;
      }
      let applicationResp;
      try {
        applicationResp = await applicationsRequests.changeApplicationStatus(orderId, statusId);
        this.applications[index].isFirstButtonLoading = false;
        this.applications[index].isSecondButtonLoading = false;
        this.applications[index].isThirdButtonLoading = false;
        this.applications[index].status.id = applicationResp.data.status.id;
        this.applications[index].status.name = applicationResp.data.status.name;

        return applicationResp;
      } catch (e: any) {
        this.applications[index].isFirstButtonLoading = false;
        this.applications[index].isSecondButtonLoading = false;
        this.applications[index].isThirdButtonLoading = false;
        throw new Error(e);
      }
    }

  }
});
