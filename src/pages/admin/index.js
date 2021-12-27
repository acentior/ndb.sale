import React from "react"
import { Link } from "gatsby"
import { Icon } from '@iconify/react';

import Seo from "./../../components/seo";
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";

const IndexPage = () => {
    return (
        <>
            <Seo title="Admin Create" />
            <main className="admin-home-page">
                <LayoutWithMenu>
                    <p className="title">Create</p>
                    <hr />
                    <div className="items_container">
                        <Link className="select-item" to="/admin/create/create-auction">
                            <Icon icon="uil:university" />
                            Auction Round
                        </Link>
                        <Link className="select-item" to="/admin/create/create-direct-purchase">
                            <Icon icon="grommet-icons:basket" />
                            Direct purchase round
                        </Link>
                        <Link className="select-item" to="/admin/create/create-auction">
                            <Icon icon="ant-design:user-add-outlined" />
                            User
                        </Link>
                        <Link className="select-item" to="/admin/create/create-auction">
                            <Icon icon="ic:sharp-pin-drop" />
                            Airdrop
                        </Link>
                        <Link className="select-item" to="/admin/avatar">
                            <Icon icon="uil:university" />
                            Avatar customization
                        </Link>
                        <Link className="select-item" to="/admin/create/create-avatar">
                            <Icon icon="bx:bxs-user-rectangle" />
                            Avatar
                        </Link>
                    </div>   
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage
