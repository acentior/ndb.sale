import { gql } from "@apollo/client"

export const GET_AUCTION = gql`
query {
    getAuctions {
        auctionId,
        number,
        startedAt,
        endedAt,
        totalToken,
        minPrice,
        avatar {
            groupId,
            compId
        },
        token,
        sold,
        stats {
            qty, 
            win,
            fail
        }
        status
    }
}
`


export const GET_BIDLIST_BY_ROUND = gql`
    query getBidListByRound($round: Int!) {
        getBidListByRound(round: $round) {
            userId,
            tokenAmount,
            tokenPrice,
            totalPrice,
            placedAt,
            updatedAt,
            status
        }
    }
`

export const GET_AUCTION_BY_NUMBER = gql`
    query getAuctionByNumber($round: Int!) {
        getAuctionByNumber(round: $round) {
            auctionId
            number
            startedAt
            endedAt
            totalToken
            minPrice
            avatar {
                groupId
                compId
            }
            token
            sold
            stats {
                qty
                win
                fail
            }
            status
        }
    }
`

export const GET_AUCTION_BY_STATUS = gql`
    query getAuctionByStatus($status: Int!) {
        getAuctionByStatus(status: $status) {
            number
            token
            status
        }
    }
`
