import { observer } from 'mobx-react';
import cx from 'classnames';
import dayjs from 'dayjs';

import { useStores } from 'src/hooks';
import Girl from 'src/img/girl.png';

import s from './Modal.module.scss';

const FORMAT_TYPE = 'MMM DD,YYYY';

export default observer(function Modal() {
    const { store } = useStores();

    const { claimable, claimableMap, walletAddr, redeem, isClaiming } = store;

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <div className={s.top}>
                    <img src={Girl} alt='' />
                    <p className={s.title}>
                        Claim Your Pawn Rewards TODAY!
                    </p>
                    <p className={s.desc}>
                    Pawn holders, we appreciate you. You supported us over the past year and your rewards are here!
                    </p>
                </div>
                <div className={s.bottom}>
                    <div>
                        As a reminder, the benefits of holding publicly-sold pawns until maturity are:<br />
                        <p style={{ height: 22 }} />
                        1. Redeemable for 20,000 USDT per each Pawn one year after mint.<br />
                        2. Equal split of 2 million $KYOKO token pool between all current Pawn holders.<br />
                        <p style={{ height: 22 }} />
                        Since Pawns are freely transferable/saleable on the secondary market, we need to verify each Pawn’s token ID and current holder. Once you connect your wallet, this page will automatically determine whether you have an eligible Pawn in your wallet. All eligible Pawn holders will receive their 20k USDT repayment and share of $KYOKO token rewards upon claiming on this page.
                    </div>
                    <div className={s.bottomWrap}>
                        <div
                            className={cx(s.claimBtn, { [s.disable]: !claimable || isClaiming })}
                            onClick={redeem}
                        >
                            Claim
                        </div>
                        <span className={s.tips}>
                            {claimableMap[walletAddr] && `You can claim after ${dayjs(claimableMap[walletAddr].claimDate).format(FORMAT_TYPE)}`}
                            {!claimableMap[walletAddr] && 'You have never owned kyoko pawn.'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});
