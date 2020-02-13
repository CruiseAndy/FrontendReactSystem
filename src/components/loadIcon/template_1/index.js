/**
 * use D8 casino
 */
import React from 'react';
import "./icon.scss";

const LoadIcon = props => {
  return (
    <div class="lds-css ng-scope">
      <div class="lds-spinner" style="width:100%;height:100%">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
}

export default LoadIcon;