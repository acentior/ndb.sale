import { useEffect, useState } from "react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import * as GraphQL from "../graghqls/querys/Auction"

export const AuctionService = () => {
    const { data, loading, error } = useQuery(GraphQL.GET_AUCTION_BY_STATUS, {
        variables: { status: 2 },
    })

    return data
}
