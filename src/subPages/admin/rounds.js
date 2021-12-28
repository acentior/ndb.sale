import React from "react"
import Seo from "./../../components/seo"
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";
import PaginationBar from "./../../components/admin/PaginationBar";
import RoundsTable from "../../components/admin/rounds/RoundsTable";

const rounds = [
    {round_id: "Round 3", time: "74 h", amount: "50000", price: "50000", round_nr: "101010", start_date: "2021/01/08", percentage: "0.005%", reserve_price: "4000", avg_price: "14.36"},
    {round_id: "Round 2", time: "74 h", amount: "50000", price: "50000", round_nr: "101011", start_date: "2021/01/08", percentage: "0.005%", reserve_price: "4000", avg_price: "14.36"},
    {round_id: "Direct Sale", time: "74 h", amount: "50000", price: "50000", round_nr: "101012", start_date: "2021/01/08", percentage: "0.005%", reserve_price: "4000", avg_price: "14.36"},
    {round_id: "Round 1", time: "74 h", amount: "50000", price: "50000", round_nr: "101013", start_date: "2021/01/08", percentage: "0.005%", reserve_price: "4000", avg_price: "14.36"},
    {round_id: "Round 0", time: "74 h", amount: "50000", price: "50000", round_nr: "101014", start_date: "2021/01/08", percentage: "0.005%", reserve_price: "4000", avg_price: "14.36"},
];

const IndexPage = () => {

    return (
        <>
            <Seo title="Admin Rounds" />
            <main className="admin-rounds-page">
                <LayoutWithMenu>
                    <p className="title">Rounds</p>
                    <div className="rounds_table">
                        <RoundsTable data={rounds} />
                        <PaginationBar/>
                    </div>                    
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage
