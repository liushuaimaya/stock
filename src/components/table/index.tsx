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
  caption?: React.ReactNode;
  columns: ColumnType<T>[];
  rowClassName?: (record: T, index: number) => string | undefined;
}

export function Table<T extends Record<string, any>>({
  className,
  dataSource,
  columns,
  caption,
  rowClassName,
}: Props<T>) {
  return (
    <table className={cx(className, classes.table)}>
      {caption && <caption>{caption}</caption>}
      <colgroup>
        {columns.map(({ className }, index) => (
          <col key={index} span={1} className={className} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map(({ className, title, dataIndex }, index) => (
            <th key={index} className={cx(className, classes.th)}>
              {typeof title === "function" ? title() : title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, rowIndex) => {
          return (
            <tr key={rowIndex} className={rowClassName?.(record, rowIndex)}>
              {columns.map(({ className, dataIndex, render }, colIndex) => {
                const content = render ? render(record[dataIndex], record, rowIndex) : record[dataIndex];
                return (
                  <td key={colIndex} className={cx(className, classes.td)}>
                    {content}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
