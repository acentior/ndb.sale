import React from "react";
import Seo from "./../../components/seo"
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";
import RoundsTable from "../../components/admin/rounds/RoundsTable";

const IndexPage = () => {
    return (
        <>
            <Seo title="Admin Rounds" />
            <main className="admin-rounds-page">
                <LayoutWithMenu>
                    <p className="title">Rounds</p>
                    <div className="rounds_table">
                        <RoundsTable />
                    </div>
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage
