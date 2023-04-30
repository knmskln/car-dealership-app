import {CarType} from "@/types/car";
import {DealerCenterType} from "@/types/dealer-center";
import {UserType} from "@/types/user";
import {DateType} from "@/types/date";

export interface ApplicationType {
  id: number,
  car: CarType,
  dealerCenter: DealerCenterType,
  user: UserType,
  status: null,
  date: DateType,
}
