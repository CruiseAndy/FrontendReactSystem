/* tools */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

/* css */
import './index.scss';

const override = css`
    border-width: 10px;
`;

const GlobalSpinner = props => {

  const [ showGlobalSpinner, setShowGlobalSpinner ] = useState(false);

	useEffect(() => {
    setShowGlobalSpinner(props.spinnerRlt);
    
    return () => {}
  }, [props.spinnerRlt]);

	return (
    <React.Fragment>
    {
      showGlobalSpinner &&
      <div className="global_spinner" style={{ backgroundColor: props.BGColor }}>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={props.SpinnerColor}
          loading={true}
        />
      </div>
    }
    </React.Fragment>
	);
}

const mapStateToProps = ({ GlobalSpinnerData }) => {
  const { spinnerRlt } = GlobalSpinnerData;
	return { spinnerRlt };
};

export default connect(mapStateToProps, { })(withRouter(injectIntl(GlobalSpinner)));