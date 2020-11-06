import React from "react";

export default function List({ items }) {
  let parsedItems = items && items.length > 0 ? items : [];

  return (
    <div>
      <ul>
        {parsedItems &&
          parsedItems.length > 0 &&
          parsedItems.map((i) => (
            <li key={i.id} data-id={i.id}>
              {`${i.displayText}`}
            </li>
          ))}
      </ul>
    </div>
  );
}
