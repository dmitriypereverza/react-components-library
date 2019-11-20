import React, { useState } from "react";
import styled from "styled-components";
import { isNil, is } from "ramda";

import Typography from "../Typography";
import Button, { ButtonType } from "../Button";

import {
  border,
  borderRadius,
  color,
  getColor,
  noWrapText,
  padding,
  paddingLeft,
} from "libs/styles";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid transparent;
  width: 100%;
  tr {
    border-bottom: 1px solid ${getColor("dimmedBlue1")};
  }

  tbody tr {
    :last-child {
      background-color: transparent;
      border-bottom: none;
    }
  }

  th {
    padding: 10px 34px 10px 0;
  }

  td {
    padding: 14px 34px 14px 0;
  }

  th {
    text-align: start;
  }

  tr td:last-child {
    width: 100%;
  }
`;

interface TableInterface {
  headers?: string[];
  rows: (string | (() => React.ReactNode))[][];
  sizes: string[];
  incrementStep?: number;
}

const SimpleTable = ({
  rows,
  headers,
  sizes,
  incrementStep,
}: TableInterface) => {
  const [openedElementsCount, setOpenedElementsCount] = useState(incrementStep);

  return (
    <Table>
      <thead>
        <tr>
          {headers.map((title, index) => (
            <th key={title} style={sizes[index] ? { width: sizes[index] } : {}}>
              <Typography
                type="mediumBody1"
                styles={[color("dimmedBlue2"), noWrapText]}
              >
                {title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(0, openedElementsCount).map((rowTitles, index) => (
          <tr key={index}>
            {rowTitles.map((rowTitle, index) => (
              <td key={index}>
                {isNil(rowTitle) ? (
                  <Typography
                    type="regularBody1"
                    useDotes
                    styles={[color("dimmedBlue2"), padding(0)]}
                  >
                    Нет данных
                  </Typography>
                ) : is(String, rowTitle) ? (
                  <Typography
                    type="regularBody1"
                    styles={[color("dimmedBlue4")]}
                  >
                    {rowTitle}
                  </Typography>
                ) : (
                  (rowTitle as Function)()
                )}
              </td>
            ))}
            {new Array(headers.length - rowTitles.length).fill("").map(() => (
              <td key={index} />
            ))}
          </tr>
        ))}
        {rows.length > incrementStep ? (
          <tr>
            <td colSpan={headers.length}>
              {openedElementsCount < rows.length ? (
                <Button
                  outerStyles={[paddingLeft(0)]}
                  type={ButtonType.text}
                  iconStyles={[border(1, "dimmedBlue1"), borderRadius(4)]}
                  iconLeft="arrowDown"
                  onClick={() =>
                    setOpenedElementsCount(openedElementsCount + incrementStep)
                  }
                >
                  Больше записей
                </Button>
              ) : (
                <Button
                  outerStyles={[paddingLeft(0)]}
                  type={ButtonType.text}
                  iconStyles={[border(1, "dimmedBlue1"), borderRadius(4)]}
                  iconLeft="arrowUp"
                  onClick={() =>
                    setOpenedElementsCount(
                      Math.max(
                        openedElementsCount - incrementStep,
                        incrementStep,
                      ),
                    )
                  }
                >
                  Меньше записей
                </Button>
              )}
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  );
};

SimpleTable.defaultProps = {
  headers: [],
  sizes: [],
  incrementStep: 5,
};

export default React.memo(SimpleTable);
