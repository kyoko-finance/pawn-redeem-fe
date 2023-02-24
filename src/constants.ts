import dayjs from 'dayjs';

export const CHAIN_ID = 1;
export const HTTP_PROVIDER = 'https://eth-mainnet.g.alchemy.com/v2/3wqY9TVz13Z-tQw5RQ17SEPukDYKp9qK';

export const ClaimableMap = {
    '0x3ab3c93114df44eb65675254bf03422038f9f2b1': {
        redeemAmount: 4 + '0'.repeat(10),
        rewardAmount: '',
        claimDate: dayjs(1647721742 * 1000).add(1, 'year')
    },
    '0xc2eef5b876ef54646c510cfc00923eb351e042b5': {
        addr: '0xc2eef5b876ef54646c510cfc00923eb351e042b5',
        redeemAmount: 2 + '0'.repeat(10),
        rewardAmount: '',
        claimDate: dayjs(1647869535 * 1000).add(1, 'year')
    },
    '0xa14b5a062f7a11c258f49c75a5d396ba77d50364': {
        redeemAmount: 4 + '0'.repeat(10),
        rewardAmount: '',
        claimDate: dayjs(1647870115 * 1000).add(1, 'year')
    },
    '0x038561cf27e255566ff75183faf4c32b24e32912': {
        redeemAmount: 2 + '0'.repeat(10),
        rewardAmount: '',
        claimDate: dayjs(1648129490 * 1000).add(1, 'year')
    },
    '0x6337814f9d2ab10f53e65e6ccc16310e61cf8584': {
        redeemAmount: 4 + '0'.repeat(10),
        rewardAmount: '',
        claimDate: dayjs(1649255361 * 1000).add(1, 'year')
    }
};

export enum CLAIM_STATUS {
    UnKnown = 0,
    Failed,
    SuccessFul
}
