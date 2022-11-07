import React, { Children, useEffect, useState } from 'react';

interface IAnimatedListChange {
  children: React.ReactElement[] | null;
  classToAdd: string;
}

const AnimatedListChange = ({ children, classToAdd }: IAnimatedListChange) => {
  const [items, setItems] = useState<
    | React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<unknown>
      >[]
    | null
  >(null);

  const prevChildrenCount = Children.count(items);
  const curChildrenCount = Children.count(children);

  const hasItemAdded = curChildrenCount > prevChildrenCount;

  const lessCount = hasItemAdded ? items : children;
  const moreCount = hasItemAdded ? children : items;

  const arrayChildrenKeys = Children.map(lessCount, (child) => child?.key);

  const animatedItems =
    moreCount &&
    Children.map(moreCount, (child) => {
      const childKey = child?.key || '';
      if (arrayChildrenKeys && arrayChildrenKeys.includes(childKey)) {
        return child;
      } else {
        return React.cloneElement(child, {
          className: `${classToAdd} ${child.props.className} ${
            hasItemAdded ? '[animation-direction:reverse]' : ''
          }`,
        });
      }
    });

  useEffect(() => {
    setTimeout(() => {
      setItems(children);
    }, 1000);
  }, [children]);

  return <>{animatedItems}</>;
};

export default AnimatedListChange;
