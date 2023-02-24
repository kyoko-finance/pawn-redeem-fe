import { useEffect } from 'react';

import { observer } from 'mobx-react';
import dayjs from 'dayjs';

import { useStores } from 'src/hooks';


export default observer(function Timer() {

    const { store: { onTimeChange } } = useStores();

    useEffect(() => {
        const timer = setInterval(() => {
            onTimeChange(+dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeChange]);

    return null;
});
