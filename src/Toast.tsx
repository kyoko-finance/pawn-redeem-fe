import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { observer } from 'mobx-react';

import { CLAIM_STATUS } from 'src/constants';
import { useStores } from 'src/hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LayOut: SnackbarOrigin = {
    horizontal: 'right',
    vertical: 'top'
};

const AlertStyle = {
    width: '100%'
};

export default observer(function Toast() {
    const { store: { claimStatus, closeTips, showTips } } = useStores();

    if (claimStatus === CLAIM_STATUS.UnKnown) return null;

    const isFailed = claimStatus === CLAIM_STATUS.Failed;

    return (
        <Snackbar
        open={showTips}
        onClose={closeTips}
        autoHideDuration={5000}
        anchorOrigin={LayOut}
      >
        <Alert
            sx={AlertStyle}
            onClose={closeTips}
            severity={isFailed ? 'error' : 'success'}
        >
          Claim {isFailed ? 'failed' : 'done'}.
        </Alert>
      </Snackbar>
    );
});
