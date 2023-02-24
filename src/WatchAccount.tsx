import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStores } from 'src/hooks';

export default observer(function WatchAccount() {
    const { store: { isInit, walletAddr, handleConnectWallet } } = useStores();

    useEffect(() => {
        if (isInit && !walletAddr) {
            handleConnectWallet();
        }
    }, [isInit, walletAddr, handleConnectWallet]);

    return null;
});
