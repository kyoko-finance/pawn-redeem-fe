import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";

const WalletSavedKey = "selectedWallet";

export const getSaveWallet = () => {
    return window.localStorage.getItem(WalletSavedKey) || "";
};

export const saveWallet = (wallet: string) => {
    window.localStorage.setItem(WalletSavedKey, wallet);
};

export const clearWallet = () => {
    window.localStorage.removeItem(WalletSavedKey);
};

export const createOnBoard = () => {
    const onboard = Onboard({
        wallets: [injectedModule(), walletConnectModule()],
        chains: [
            {
                id: "0x1",
                token: "ETH",
                label: "Ethereum Mainnet",
                rpcUrl: "https://mainnet.infura.io/v3/c7a306b346024098b99d06b2d1181569",
            }
        ],
        appMetadata: {
            name: "Kyoko",
            icon: `<svg width="138" height="28" viewBox="0 0 138 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_11051_6726)">
                <path d="M43.8946 9.53711H40.4209V19.1292H43.8946V9.53711Z" fill="#000"/>
                <path d="M55.1052 9.53711H51.6316L44.7744 17.8858H48.2481L55.1052 9.53711Z" fill="#000"/>
                <path d="M44.7744 19.1294L51.6316 27.4559H55.1052L48.2481 19.1294H44.7744Z" fill="#000"/>
                <path d="M105.428 9.53711H101.955V19.1292H105.428V9.53711Z" fill="#000"/>
                <path d="M116.639 9.53711H113.165L106.308 17.8858H109.782L116.639 9.53711Z" fill="#000"/>
                <path d="M106.308 19.1294L113.165 27.4559H116.639L109.782 19.1294H106.308Z" fill="#000"/>
                <path d="M72.6315 9.53711L69.0225 16.3981L70.827 19.5733L76.0826 9.53711H72.6315Z" fill="#000"/>
                <path d="M59.9097 9.53711L66.4736 20.9721L63.2931 27.5001H66.7668L69.9473 20.9721L63.3834 9.53711H59.9097Z" fill="#000"/>
                <path d="M88.1954 9.53711C83.1428 9.53711 79.0601 13.5782 79.0601 18.5297C79.0601 23.1037 82.5337 26.8784 87.0225 27.4557V24.9022C83.9548 24.3471 81.6315 21.7049 81.6315 18.5297C81.6315 14.9549 84.5864 12.0684 88.1954 12.0684C91.8044 12.0684 94.7593 14.9771 94.7593 18.5297C94.7593 21.7049 92.436 24.3471 89.3683 24.9022V27.4557C93.8571 26.8784 97.3307 23.1037 97.3307 18.5297C97.3307 13.5782 93.2255 9.53711 88.1954 9.53711Z" fill="#000"/>
                <path d="M128.842 9.53711C123.789 9.53711 119.707 13.5782 119.707 18.5297C119.707 23.1037 123.18 26.8784 127.669 27.4557V24.9022C124.601 24.3471 122.278 21.7049 122.278 18.5297C122.278 14.9549 125.233 12.0684 128.842 12.0684C132.451 12.0684 135.406 14.9771 135.406 18.5297C135.406 21.7049 133.083 24.3471 130.015 24.9022V27.4557C134.504 26.8784 137.977 23.1037 137.977 18.5297C138 13.5782 133.895 9.53711 128.842 9.53711Z" fill="#000"/>
                <path d="M10.1053 1.03271H0V27.4998H10.1053V1.03271Z" fill="#000"/>
                <path d="M23.7295 14.9326H13.4663L21.3836 27.5001H31.6242L23.7295 14.9326Z" fill="#000"/>
                <path d="M19.1279 12.7122C22.6241 12.7122 25.4662 9.98108 25.4662 6.60608C25.4662 3.23109 22.6241 0.5 19.1279 0.5C15.6317 0.5 12.7896 3.23109 12.7896 6.60608C12.7896 9.98108 15.6317 12.7122 19.1279 12.7122Z" fill="#000"/>
                </g>
                <defs>
                <clipPath id="clip0_11051_6726">
                <rect width="138" height="27" fill="#000" transform="translate(0 0.5)"/>
                </clipPath>
                </defs>
                </svg>
            `,
            description: " ",
            recommendedInjectedWallets: [
                { name: "MetaMask", url: "https://metamask.io" },
                { name: "WalletConnect", url: "https://walletconnect.com" },
            ],
        },
        accountCenter: {
            desktop: {
                enabled: false,
            },
            mobile: {
                enabled: true
            }
        },
    });

    return onboard;
};
