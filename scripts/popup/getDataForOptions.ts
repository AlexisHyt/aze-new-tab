import type {
  ICustomSearchEngine,
  IGroup,
  IPreset,
  IRSSFeed,
} from "~scripts/popup/types";

type TData = ICustomSearchEngine | IRSSFeed | IGroup | IPreset;
export const getDataForOptions = (
  data: TData[],
  additionalData: { value: string; label: string }[] = [],
) => {
  const computedData = data.map((d: TData) => {
    return {
      value: JSON.stringify(d),
      label: d.name,
    };
  });

  return [...additionalData, ...computedData];
};
