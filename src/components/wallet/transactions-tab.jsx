import React from "react"

export default function Transactions() {
    return (
        <table className="wallet-transaction-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end">Status</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(15).keys()].map((item) => (
                    <tr>
                        <td className="fw-bold text-success">BSNQ4X</td>
                        <td>
                            12 / 27 / 21
                            <br />
                            <div className="text-secondary fs-15px mt-1">21 : 31 : 12</div>
                        </td>
                        <td>Withdraw</td>
                        <td className="text-end">
                            2,497.5000
                            <br />
                            <div className="text-secondary fw-bold mt-1 fs-16px">NDB</div>
                        </td>
                        <td className="d-flex align-items-center justify-content-end">
                            <div className="green-bullet me-2"></div>
                            <div>Success</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
