import React, { useState } from "react"
import { Input } from "../common/FormControl"
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input"
import en from "react-phone-number-input/locale/en.json"

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">{labels.ZZ}</option>
        {getCountries().map((country) => (
            <option key={country} value={country}>
                {labels[country]}
            </option>
        ))}
    </select>
)

                        name="countrySelect"
                        onChange={(c) => {
                            const code = `+${getCountryCallingCode(c)} `
                            setCountry(code)
                            setMobile(code)
                        }}
                    />
                    <Input
                        type="text"
                        value={mobile}
                        onChange={(e) => {
                            const input = e.target.value
                            setMobile(country + input.substr(country.length))
                        }}
                    />
                </div>
                <p>You will receive a sms code to the number above</p>
                <button className="btn-primary next-step mt-4" onClick={() => confirm(mobile)}>
                    Confirm Number
                </button>
            </div>
        </div>
    )
}
