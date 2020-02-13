/* tool */
import React, { useState, useEffect } from 'react';

import "./index.scss";

const ReactSelect = ({
  data=null,
  layer=1,
  layerKey="",
  placeholder="",
  dash="-"
}) => {

  const [ elementPos, setElementPos ] = useState(null);
  const [ selectedItem, setSelecteditem ] = useState(placeholder);

	useEffect(() => {
    let rect = document.getElementById("selComponent").getBoundingClientRect();
    setElementPos(document.getElementById("selComponent").getBoundingClientRect());
  }, []);
  
	return (
    <div
      id="selComponent"
      className="select_component"
    >
      <div className="selected_item_box">
        <span className="selected_item_txt">{selectedItem}</span>
      </div>
      <span className="icon-angle-down" />
      {
        elementPos &&
        <div
          className="dropdown_box"
          style={{
            top: `${elementPos.top + 45}px`,
            left: `${elementPos.left}px`,
            width: `${elementPos.width}px`
          }}
        ></div>
      }
		</div>
	);
};

export default ReactSelect;