import { action, makeAutoObservable, runInAction, computed, reaction } from 'mobx';
import { ethers } from "ethers";

import { getSaveWallet, createOnBoard } from "src/wallet";

import { CHAIN_ID, HTTP_PROVIDER, ClaimableMap, CLAIM_STATUS } from 'src/constants';
import { Info } from 'src/contract-info';

export default class Store {
    walletAddr = '';

    isInit = false;

    chainId = 0;

    timer = 0;

    claimStatus = CLAIM_STATUS.UnKnown;

    isClaiming = false;

    showTips = false;

    didUserClaimed = false;

    claimableMap = ClaimableMap;

    onboard = null as unknown as any;

    contract = null as unknown as ethers.Contract;

    provider = null as unknown as ethers.providers.Web3Provider;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        reaction(() => [this.walletAddr, this.contract], this.queryUserClaimable);
    }

    @computed get clipAddr() {
        const { walletAddr } = this;
        if (!walletAddr) return '';
        const len = walletAddr.length;

        return walletAddr.slice(0, 4) + '...' + walletAddr.slice(len - 4);
    }

    @computed get claimable () {
        const { claimableMap, walletAddr, timer, didUserClaimed } = this;

        if (!walletAddr) return false;
        if (didUserClaimed) return false;
        if (!claimableMap[walletAddr]) return false;
        return timer >= claimableMap[walletAddr].claimDate;
    }

    @action.bound
    onInit() {
        if (this.isInit) return;
        const onboard = createOnBoard();
        runInAction(() => {
            this.isInit = true;
            this.onboard = onboard;
        });

        this.initContract();
    }

    @action.bound
    initContract() {
        const provider = new ethers.providers.JsonRpcProvider(HTTP_PROVIDER);
        const contract = new ethers.Contract(Info.addr, Info.abi, provider);
        this.contract = contract;
        this.provider = provider as ethers.providers.Web3Provider;
    }

    @action.bound
    onAccountChange(accounts: Array<{ address: string }>) {
        runInAction(() => {
            this.walletAddr = (accounts[0]?.address || "").toLowerCase();
        });
    }

    @action.bound
    onNetWorkChange(chains: Array<{ id: string }>) {
        runInAction(() => {
            this.chainId = +(chains[0]?.id || "0");
        });
    }

    @action.bound
    onTimeChange(time: number) {
        runInAction(() => {
            this.timer = time;
        });
    }

    @action.bound
    async handleConnectWallet() {
        if (!this.onboard || this.walletAddr) return;
        try {
            const wallet = getSaveWallet();
            if (wallet) {
                await this.onboard.connectWallet({ autoSelect: wallet });
            } else {
                await this.onboard.connectWallet();
            }
            await this.onboard.setChain({
                chainId: `0x${CHAIN_ID.toString(16)}`,
            });
        } catch {
            // do nothing
        }
    }

    @action.bound
    initProviderConfig(provider: ethers.providers.ExternalProvider) {
        runInAction(() => {
            this.provider = new ethers.providers.Web3Provider(provider);
        });
    }

    @action.bound
    async queryUserClaimable() {
        const { contract, walletAddr } = this;
        if (!contract || !walletAddr) return;

        try {
            const isClaimed = await contract.claimedMap(walletAddr);

            runInAction(() => {
                this.didUserClaimed = isClaimed;
            });
        } catch {
            // todo
        }
    }

    @action.bound
    async redeem() {
        const { contract, walletAddr, provider, claimable } = this;
        if (!contract || !walletAddr || !claimable) return;

        runInAction(() => {
            this.isClaiming = true;
        });

        try {
            const { hash } = await contract
                .connect(provider.getUncheckedSigner())
                .redeem();
            
            const result = await provider.waitForTransaction(hash);

            runInAction(() => {
                this.claimStatus = result.status === 1 ? CLAIM_STATUS.SuccessFul : CLAIM_STATUS.Failed;
            });

            if (result.status === 1) {
                runInAction(() => {
                    this.didUserClaimed = true;
                });
            }
        } catch {
            runInAction(() => {
                this.claimStatus = CLAIM_STATUS.Failed;
            });
        } finally {
            runInAction(() => {
                this.showTips = true;
                this.isClaiming = false;
            });
        }
    }

    @action.bound
    closeTips() {
        runInAction(() => {
            this.showTips = false;
        });
    }
}
