import { useEffect } from 'react';

import { observer } from 'mobx-react';

import { saveWallet } from 'src/wallet';
import { useStores } from 'src/hooks';

export default observer(function WatchWallet() {
    const { store: { onboard, initProviderConfig, onNetWorkChange, onAccountChange } } = useStores();

    useEffect(() => {
        if (!onboard) return;
        const state = onboard.state.select('wallets');
        const { unsubscribe } = state.subscribe(([wallet]) => {
            if (wallet) {
                const { label, accounts, provider, chains } = wallet;
                saveWallet(label);
                onNetWorkChange(chains);
                initProviderConfig(provider);
                onAccountChange(accounts);
            } else {
                onAccountChange([]);
                onNetWorkChange([]);
            }
        });
        return unsubscribe;
    }, [onboard, initProviderConfig, onNetWorkChange, onAccountChange]);

    return null;
});
