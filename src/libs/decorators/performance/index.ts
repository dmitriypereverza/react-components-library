import { FC } from "react";
import { pickAll } from "ramda";

import isEqual from "./isEqual";

export function excludeFromObject(
  object: { [name: string]: any },
  excludeArray: string[],
) {
  return pickAll(
    Object.keys(object).filter(function(propertyName) {
      return !excludeArray.includes(propertyName);
    }),
    object,
  );
}

/**
 * декоратор для глубокого сравнения объектов в props и ServiceModule
 * @function
 * @param {[]string} ignorePropNames - игнорировать пропсы с указанными именами при проверке
 * @param {boolean} deep - глубокая проверка объектов
 * @example
 * @performance(["onClick"])
 * class App extends React.Component {
 *    render() {}
 * }
 */
export default function performance<T>(
  ignorePropNames: string[] = [],
  deep = true,
): (App: any) => FC<T> {
  return function decorator(App) {
    App.prototype.shouldComponentUpdate = function shouldComponentUpdate(
      nextProps,
      nextState,
    ) {
      const propsWithoutIgnored = excludeFromObject(
        this.props,
        ignorePropNames,
      );
      const nextPropsWithoutIgnored = excludeFromObject(
        nextProps,
        ignorePropNames,
      );
      return (
        !isEqual(propsWithoutIgnored, nextPropsWithoutIgnored, deep) ||
        !isEqual(this.state, nextState, true)
      );
    };

    return App;
  };
}
