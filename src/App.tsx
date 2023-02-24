import { useEffect } from "react";
import { observer } from "mobx-react";

import WatchAccount from "src/WatchAccount";
import WatchWallet from "src/WatchWallet";
import { useStores } from 'src/hooks';
import Banner from "src/Banner";
import Modal from "src/Modal";
import Timer from "src/Timer";
import Toast from "src/Toast";

import "./App.scss";

export default observer(function App() {

    const { store } = useStores();

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            window.store = store;
        }
        store.onInit();
    }, [store]);

    return (
        <div className='container'>
            <Banner />
            <Modal />
            <Timer />
            <Toast />
            <WatchWallet />
            <WatchAccount />
        </div>
    );
});
