export enum IndustryEnum {
  All="All",
  Insurance="insurance",
  Travel="travel",
  Tech="tech",
  Marketing="marketing",
  Finance= "finance",
}

export namespace IndustryEnum {
  export const displayedValues: IndustryEnum[] = [
    IndustryEnum.All,
    IndustryEnum.Insurance,
    IndustryEnum.Travel,
    IndustryEnum.Tech,
    IndustryEnum.Marketing,
    IndustryEnum.Finance,
  ];

  export function toString(type: IndustryEnum): string {
    switch (type) {
      case IndustryEnum.All:
        return "All";
      case IndustryEnum.Insurance:
        return "Insurance";
      case IndustryEnum.Travel:
        return "Traveling";
      case IndustryEnum.Tech:
        return "technologies";
      case IndustryEnum.Marketing:
        return "Marketing";
      case IndustryEnum.Finance:
        return "Finance";
    }
  }

  function mapToSelectItem(type: IndustryEnum): {
    value: IndustryEnum;
    label: string;
  } {
    return {
      value: type,
      label: toString(type),
    };
  }
  export const items = displayedValues.map(item => mapToSelectItem(item));
}
