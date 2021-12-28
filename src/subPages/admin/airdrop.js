import React from "react"
import Seo from "./../../components/seo"
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";
import PaginationBar from "./../../components/admin/PaginationBar";
import AirdropTable from "../../components/admin/airdrop/AirdropTable";

const airdrops = [
    {name: 'Amy Matthews', avatar: 'Tesla.12', status: 'complete' },
    {name: 'Amira Kandovsky', avatar: 'Voltapancake', status: 'pending' },
    {name: 'Bernard Lane', avatar: 'CutieCurry', status: 'pending' },
    {name: 'Joseph Martini', avatar: 'Johnson Johnson', status: 'complete' },
    {name: 'Tom Jager', avatar: 'Cruto1431', status: 'complete' },
];

const IndexPage = () => {

    return (
        <>
            <Seo title="Admin Airdrop" />
            <main className="admin-airdrop-page">
                <LayoutWithMenu>
                    <p className="title">AIRDROP</p>
                    <div className="rounds_table">
                        <AirdropTable data={airdrops} />
                        <PaginationBar/>
                    </div>                    
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage
