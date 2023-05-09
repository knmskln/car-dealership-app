import {CarType} from "@/types/car";
import {DealerCenterType} from "@/types/dealer-center";
import {UserType} from "@/types/user";
import {DateType} from "@/types/date";
import {StatusType} from "@/types/status";

export interface ApplicationType {
  id: number,
  car: CarType,
  dealerCenter: DealerCenterType,
  user: UserType,
  status: StatusType,
  date: DateType,
  value: number,
  show: false,
  isFirstButtonLoading: boolean,
  isSecondButtonLoading: boolean,
  isThirdButtonLoading: boolean,
}
