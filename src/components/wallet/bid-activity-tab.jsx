import React from "react"

export default function BidActivityTab({ bids }) {
    console.log(bids)
    return (
        <table className="wallet-transaction-table">
            <thead className="border-0">
                <tr>
                    <th>ID</th>
                    <th>Date
                {bids?.map((item, idx) => (
                    <tr key={idx}>
                        <td className="fw-bold text-success">Round {item?.roundId}</td>
                        <td>
                            {new Date(item?.placedAt)}
                            <br />
                            {/* <div className="text-secondary fs-15px mt-1">21 : 31 : 12</div> */}
                        </td>
                        <td className="teer justify-content-center">
                            <div
                                className={`bullet me-2 ms-4 ${
                                    item.status === 2
                                        ? "bg-red"
                                        : item.status === 1
                                      
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
