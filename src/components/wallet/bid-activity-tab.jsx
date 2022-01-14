import React from "react"

export default function BidActivityTab() {
    return (
        <table className="wallet-transaction-table">
            <thead className="border-0">
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Status</th>
                </tr>
            </thead>
            <tbody className="pe-3">
                {[...Array(15).keys()].map((item) => (
                    <tr>
                        <td className="fw-bold text-success">Round 80</td>
                        <td>
                            12 / 27 / 21
                            <br />
                            <div className="text-secondary fs-15px mt-1">21 : 31 : 12</div>
                        </td>
                        <td className="text-end">
                            2,497.5000
                            <br />
                            <div className="text-secondary fw-bold mt-1 fs-16px">NDB</div>
                        </td>
                        <td className="d-flex align-items-center justify-content-center">
                            <div className="green-bullet me-2 ms-4"></div>
                            <div>Win</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
