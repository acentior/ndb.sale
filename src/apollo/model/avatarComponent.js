import { useMutation } from "@apollo/client";
import * as GraphQL from '../graghqls/mutations/AvatarComponent';
// $groupId: String!
//         $tierLevel: Int!
//         $price: Float!
//         $limited: Int!
//         $svg: String!
//         $width: Int!
//         $top: Int!
//         $left: Int!
export const useCreateNewComponentMutation = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.CREATE_NEW_COMPONENT, {
        retry: 1,
        onCompleted: (data) => {
            if (data.signin.status === "Failed") {
                // do something
                return
            } else if (data.signin.status === "Success") {
                setUser({
                    ...getUser(),
                    tempToken: data.signin.token
                })
                navigate("/app/onetime-pwd")
            }
        },
    })

    const signin = (email, password) => {
        setUser({
            ...getUser(),
            tempToken: null,
            email: email,
        })
        return mutation({
            variables: {
                email,
                password,
            },
        })
    }
    return [signin, mutationResults]
};