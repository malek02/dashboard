export enum StatusEnum {
  All = "all",
  Active = "active",
  Inactive = "inactive",
}

export namespace StatusEnum {
  export const displayedValues: StatusEnum[] = [
       StatusEnum.All,
    StatusEnum.Active,
    StatusEnum.Inactive,
  ];

  export function toString(type: StatusEnum): string {
    switch (type) {
      case StatusEnum.All:
        return "All";
      case StatusEnum.Active:
        return "Active";
      case StatusEnum.Inactive:
        return "Inactive";
    }
  }

  function mapToSelectItem(type: StatusEnum): {
    value: StatusEnum;
    label: string;
  } {
    return {
      value: type,
      label: toString(type),
    };
  }
  export const items = displayedValues.map((item) => mapToSelectItem(item));
}
