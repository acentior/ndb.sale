import { gql } from "@apollo/client"

export const SIGNUP = gql`
    mutation signup($email: String!, $password: String!, $country: String!) {
        signup(email: $email, password: $password, country: $country)
    }
`

export const VERIFY_ACCOUNT = gql`
    mutation verifyAccount($email: String!, $code: String!) {
        verifyAccount(email: $email, code: $code)
    }
`

export const RESEND_VERIFY_CODE = gql`
    mutation resendVerifyCode($email: String!) {
        resendVerifyCode(email: $email)
    }
`

export const REQUEST_2FA = gql`
    mutation request2FA($email: String!, $method: String!, $phone: String!) {
        request2FA(email: $email, method: $method, phone: $phone)
    }
`
export const DISABLE_2FA = gql`
    mutation disable2FA($method: String!) {
        disable2FA(method: $method)
    }
`
export const CONFIRM_REQUEST_2FA = gql`
    mutation confirmRequest2FA($email: String!, $method: String!, $code: String!) {
        confirmRequest2FA(email: $email, method: $method, code: $code)
    }
`

export const SIGNIN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            status
            token
            twoStep
        }
    }
`

export const SIGNIN_2FA = gql`
    mutation confirm2FA($email: String!, $token: String!, $code: [TwoFAEntry]) {
        confirm2FA(email: $email, token: $token, code: $code) {
            status
            token
            twoStep
        }
    }
`

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`

export const SET_AVATAR = gql`
    mutation setAvatar($prefix: String!, $name: String!) {
        setAvatar(prefix: $prefix, name: $name)
    }
`

export const GET_AVATARS = gql`
    {
        getAvatars {
            id
            deleted
            fname
            surname
            skillSet {
                id
                name
                rate
            }
            avatarSet {
                id
                deleted
                groupId
                compId
            }
            hairColor
            factsSet {
                id
                deleted
                topic
                detail
            }
            details
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation changePassword($newPassword: String!) {
        changePassword(newPassword: $newPassword)
    }
`

export const RESET_PASSWORD = gql`
    mutation resetPassword($email: String!, $code: String!, $newPassword: String!) {
        resetPassword(email: $email, code: $code, newPassword: $newPassword)
    }
`

export const DELETE_ACCOUNT = gql`
    mutation deleteAccount {
        deleteAccount
    }
`

export const CONFIRM_DELETE_ACCOUNT = gql`
    mutation confirmDeleteAccount($text: String!) {
        confirmDeleteAccount(text: $text)
    }
`
export const VERIFY_KYC_MUTATION = gql`
    mutation verifyKYC(
        $country: String
        $email: String
        $faceProof: String
        $documentProof: String
        $addressProof: String
        $fullAddress: String
        $consentProof: String
        $fname: String
        $mname: String
        $lname: String
        $dob: String
    ) {
        verifyKYC(
            shuftiRequest: {
                country: $country
                email: $email
                face: { proof: $faceProof }
                document: {
                    proof: $documentProof
                    name: { first_name: $fname, last_name: $lname }
                    dob: $dob
                }
                address: { proof: $addressProof, full_address: $fullAddress }
                consent: { proof: $consentProof }
                background_checks: {
                    name: { first_name: $fname, middle_name: $mname, last_name: $lname }
                    dob: $dob
                }
            }
        )
    }
`
