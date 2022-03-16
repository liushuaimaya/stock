import React from "react";
import cx from "classnames";
import classes from "./index.module.css";

export interface ColumnType<T> {
  className?: string;
  dataIndex: string;
  title: React.ReactNode | (() => React.ReactNode);
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface Props<T> {
  className?: string;
  dataSource: T[];
  columns: ColumnType<T>[];
  rowKey: React.Key;
  rowClassName?: (record: T, index: number) => string | undefined;
}

export function Table<T extends Record<string, any>>({
  className,
  dataSource,
  columns,
  rowKey,
  rowClassName,
}: Props<T>) {
  return (
    <table className={cx(className, classes.table)}>
      <colgroup>
        {columns.map(({ className, dataIndex }, index) => (
          <col key={dataIndex ?? index} span={1} className={className} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map(({ className, title, dataIndex }, index) => (
            <th key={dataIndex ?? index} className={cx(className, classes.th)}>
              {typeof title === "function" ? title() : title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, rowIndex) => (
          <tr key={record[rowKey] ?? rowIndex} className={rowClassName?.(record, rowIndex)}>
            {columns.map(({ className, dataIndex, render }, colIndex) => {
              const content = render ? render(record[dataIndex], record, rowIndex) : record[dataIndex];
              return (
                <td key={dataIndex ?? colIndex} className={cx(className, classes.td)}>
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
