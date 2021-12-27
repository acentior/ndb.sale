import { gql } from "@apollo/client"

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notifications {
    notifications {
      id,
      userId,
      t,
      msg,
      read,
      type,
      broadcast
    }
  }
`