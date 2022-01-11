import React, { useState } from "react"
import { wallets } from "../../utilities/staticData"
import { useConnect, useAccount } from "wagmi"

export default function ConnectWalletTab() {
    const [wallet, setWallet] = useState(null)
    const [{ data: connectData, error: connectError }, connect] = useConnect()
    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    console.log("Connect Data", connectData)
    console.log("Account Data", accountData)

    return (
        <div className="connect-wallet">
            <h4>select wallet</h4>
            <div className="row">
                {accountData ? (
                    <div>
                        {/* <img src={accountData.ens?.avatar} alt="ENS Avatar" /> */}
                        <div>
                            {accountData.ens?.name
                                ? `${accountData.ens?.name} (${accountData.address})`
                                : accountData.address}
                        </div>
                        <div>Connected to {accountData.connector.name}</div>
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
                                onClick={() => x.ready && setWallet(x)}
                                onKeyDown={() => x.ready && setWallet(x)}
                                role="presentation"
                            >
                                <div className={`wallet-item ${x === wallet && "active"}`}>
                                    <img src={wallets[x.id]?.icon} alt="wallet icon" />
                                    <p>{x.ready ? wallets[x.id]?.desc : wallets[x.id]?.warn}</p>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                className="btn-primary"
                                disabled={!wallet}
                                onClick={() => connect(wallet)}
                            >
                                CONNECT
                            </button>
                        </div>
                    </>
                )}

                {connectError && <div>{connectError?.message ?? "Failed to connect"}</div>}
            </div>
        </div>
    )
}
