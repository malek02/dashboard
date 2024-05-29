
import { StatusEnum } from "../enums/custumerStatus.enum";
import { IndustryEnum } from "../enums/industry.enum";
import { ProjectApi, ProjectModel } from "./project.model";


export interface CustomerApi {
    id: string;
    isActive: boolean;
    company: string;
    industry: IndustryEnum;
    projects: ProjectApi[];
    about: string;
}

export interface CustomerModel {
    costumerId: string;
    costumerStatus: StatusEnum;
    companyName: string;
    industry: IndustryEnum;
    projects: ProjectModel[];
    about: string;
  }
  
  export namespace CustomerModel {
    export function mapFromApi(customer: CustomerApi): CustomerModel {
      return {
        costumerId: customer.id,
        companyName: customer.company,
        industry: customer.industry,
        projects: (customer.projects || []).map(item=>ProjectModel.mapFromApi(item)),
        costumerStatus: customer.isActive ? StatusEnum.Active : StatusEnum.Inactive ,
        about: customer.about,
  
      };
    }
  }