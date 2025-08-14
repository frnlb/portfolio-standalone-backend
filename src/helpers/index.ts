export const valuesMapper = <T>(obj: T) => {
  let colNames = "";
  let colValues = "";
  const entries = Object.entries(obj as {});
  const filteredEntries = entries.filter(
    ([colName, colValue]) => colValue !== undefined
  );
  const lastItem = filteredEntries.length - 1;
  filteredEntries.map(([colName, colValue], index) => {
    const comma = index < lastItem ? ", " : "";
    colNames += `${colName}${comma}`;
    colValues +=
      typeof colValue === "string"
        ? `"${colValue}"${comma}`
        : `${colValue}${comma}`;
  });
  return [colNames, colValues];
};
