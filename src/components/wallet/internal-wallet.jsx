/* eslint-disable */

import React, { useState } from "react"
import { NDB } from "../../utilities/imgImport"
import CustomSpinner from "../common/custom-spinner"
import { numberWithCommas } from "../../utilities/number"
import { useQuery } from "@apollo/client"
import { GET_BALANCES } from "../../apollo/graghqls/querys/Auth"

export default function InternalWallet() {
    const [myAssets, setMyAssets] = useState([])

    const { data: balances } = useQuery(GET_BALANCES, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setMyAssets(
                balances.getBalances?.map((item) => {
                    return {
                        icon: NDB,
                        abbr: item.tokenSymbol,
                        name: item.tokenName,
                        amount: item.free + item.hold,
                    }
                })
            )
        },
    })

    const loadingSection = !myAssets

    if (loadingSection)
        return (
            <div className="text-center my-5">
                <CustomSpinner />
            </div>
        )
    else
        return (
            <table className="my-3">
                <tbody>
                    {myAssets.map((item, idx) => (
                        <tr key={idx}>
                            <td className="d-flex align-items-center ps-2">
                                <img src={item.icon} alt="coin icon" className="me-2" />
                                <div>
                                    <p className="coin-abbr text-light">{item.name}</p>
                                </div>
                            </td>
                            <td>
                                <p className="coin-price fw-bold">
                                    {item.amount} {item.abbr}
                                </p>
                                {/* <p className="coin-percent">{numberWithCommas(item.price)}$</p> */}
                            </td>
                        </tr>
                    ))}
                    {myAssets.length === 0 && (
                        <p className="text-center fw-500 text-uppercase">no assets found</p>
                    )}
                </tbody>
            </table>
        )
}
