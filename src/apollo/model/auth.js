import * as GraphQL from "../graghqls/mutations/Auth"
import { useMutation } from "@apollo/client"
import { navigate } from "gatsby"
import { setAuthToken, getUser, setUser } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"

// Sign In

export const useSigninMutation = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.SIGNIN, {
        retry: 1,
        onCompleted: (data) => {
            console.log("signin data", data)
            if (data.signin.status === "Failed") {
                // do something
                return
            } else if (data.signin.status === "Success") {
                setUser({
                    ...getUser(),
                    tempToken: data.signin.token,
                    twoStep: data.signin.twoStep,
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
}

// Sine Up

export const useSignupMutation = () => {
    const [mutation, mutationResults] = useMutation(GraphQL.SIGNUP, {
        onCompleted: (data) => {
            navigate("/app/verify-email")
        },
    })

    const signup = (email, password, country) => {
        setUser({
            ...getUser(),
            email: email,
        })
        return mutation({
            variables: {
                email,
                password,
                country,
            },
        })
    }
    return [signup, mutationResults]
}

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
