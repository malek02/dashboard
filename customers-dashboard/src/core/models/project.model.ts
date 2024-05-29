import dayjs from 'dayjs';

export interface ProjectApi {
    id: string;
    name: string;
    contact: string | null;
    start_date: string;
    end_date: string | null;
}

export interface ProjectModel {
    projectId: string;
    projectName: string;
    contact: string ;
    startDate?: string;
    endDate?: string;
 
  }
  
  export namespace ProjectModel {
    export function mapFromApi(project: ProjectApi): ProjectModel {
      return {
        projectId: project.id || '-',
        projectName: project.name || '-',
        contact: project.contact || '-',
        startDate: !!project.start_date?dayjs(project.start_date).format('YYYY MMM DD'):undefined,
        endDate:!!project.end_date ?dayjs(project.end_date).format('YYYY MMM DD'):undefined,
  
      };
    }
  }