import React from "react"
import { navigate } from "gatsby"
import { wallets } from "../../utilities/staticData"
import { useConnect, useAccount } from "wagmi"
import { isMobile } from "react-device-detect"

const TRUST_URL = "https://link.trustwallet.com/open_url?coin_id=60&url=https://sale.ndb.money"

export default function ConnectWalletTab() {
    const [{ data: connectData, error: connectError }, connect] = useConnect()
    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    console.log("Connect Data", connectData)
    console.log("Account Data", accountData)

    return (
        <div className="row">
            {accountData ? (
                <div>
                    <div className="connected">
                        <img src={wallets[accountData.connector.id]?.icon} alt="wallet icon" />
                        <p>{accountData.address}</p>
                    </div>
                    <button className="btn-primary" onClick={disconnect}>
                        Disconnect
                    </button>
                </div>
            ) : (
                <>
                    {connectData.connectors.map((x, idx) => (
                        <div
                            className="col-sm-6"
                            key={idx}
                            onClick={() => x.ready && connect(x)}
                            onKeyDown={() => x.ready && connect(x)}
                            role="presentation"
                        >
                            <div className={`wallet-item  ${!x.ready && "inactive"}`}>
                                <img src={wallets[x.id]?.icon} alt="wallet icon" />
                                <p>{x.ready ? wallets[x.id]?.desc : wallets[x.id]?.warn}</p>
                            </div>
                        </div>
                    ))}
                    <div
                        className="col-sm-6"
                        onClick={() => {
                            isMobile && navigate(TRUST_URL)
                        }}
                        onKeyDown={() => {
                            isMobile && navigate(TRUST_URL)
                        }}
                        role="presentation"
                    >
                        <div className={`wallet-item  ${!isMobile && "inactive"}`}>
                            <img src={wallets.trustWallet.icon} alt="wallet icon" />
                            <p>{isMobile ? wallets.trustWallet.desc : wallets.trustWallet.warn}</p>
                        </div>
                    </div>
                </>
            )}
            {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
        </div>
    )
}
