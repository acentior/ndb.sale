import * as GraphQL from "../graghqls/mutations/Auth"
import { useMutation } from "@apollo/client"
import { navigate } from "gatsby"
import { setAuthToken } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"

// Signin with 2FA
export const useSignIn2FA = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.SIGNIN_2FA, {
        onCompleted: (data) => {
            if (data.confirm2FA.status === "Failed") {
                return
            } else if (data.confirm2FA.status === "Success") {
                setAuthToken(data.confirm2FA.token)
                navigate(ROUTES.profile)
            }
        },
    })

    const signin2fa = (email, token, code) => {
        return mutation({
            variables: {
                email,
                token,
                code,
            },
        })
    }
    return [signin2fa, mutationResults]
}

// Forgot Password

export const useForgotPassword = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.FORGOT_PASSWORD, {
        errorPolicy: "ignore",
        onCompleted: (data) => {
            if (data?.forgotPassword === "Success") {
                navigate(ROUTES.changePassword)
            }
        },
    })

    const forgotPassword = (email) => {
        localStorage.setItem("FORGOT_PASSWORD_EMAIL", email)
        return mutation({
            variables: {
                email,
            },
        })
    }
    return [forgotPassword, mutationResults]
}

export const useChangePassword = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.CHANGE_PASSWORD)

    const changePassword = (newPassword) => {
        return mutation({
            variables: {
                newPassword,
            },
        })
    }
    return [changePassword, mutationResults]
}

export const useResetPassword = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.RESET_PASSWORD)

    const resetPassword = (email, code, newPassword) => {
        return mutation({
            variables: {
                email,
                code,
                newPassword,
            },
        })
    }
    return [resetPassword, mutationResults]
}
