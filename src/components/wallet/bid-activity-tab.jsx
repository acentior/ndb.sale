import React from "react"

export default function BidActivityTab({ bids }) {
    console.log(bids)
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
                {bids?.map((item, idx) => (
                    <tr key={idx}>
                        <td className="fw-bold text-success">Round {item?.roundId}</td>
                        <td>
                            {new Date(item?.placedAt)}
                            <br />
                            {/* <div className="text-secondary fs-15px mt-1">21 : 31 : 12</div> */}
                        </td>
                        <td className="text-end">
                            {item?.tokenAmount}
                            <br />
                            <div className="text-secondary fw-bold mt-1 fs-16px">NDB</div>
                        </td>
                        <td className="d-flex align-items-center justify-content-center">
                            <div
                                className={`bullet me-2 ms-4 ${
                                    item.status === 2
                                        ? "bg-red"
                                        : item.status === 1
                                        ? "bg-green"
                                        : "bg-grey"
                                }`}
                            ></div>
                            <div>Win</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
