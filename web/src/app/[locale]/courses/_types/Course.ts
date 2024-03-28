import { CourseSector } from "./CourseSector";
import { School } from "./School";

export type Course = {
  id: number;
  name: string;
  school: School;
  tuition_fee: string;
  application_fee: string;
  duration: string;
  intake: string;
  sector: CourseSector;
};
