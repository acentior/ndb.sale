import React from "react"
import Header from "../components/header"
import Accordion from "../components/common/Accordion"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

const faq_tabs = [
    {
        value: "Token",
        label: "Token",
    },
    {
        value: "Auction FAQ",
        label: "Auction FAQ",
    },
]
const auction_faq_tabs = [
    {
        value: "NDB Token",
        label: "NDB Token",
    },
    {
        value: "Volt Token",
        label: "Volt Token",
    },
    {
        value: "Stake pool",
        label: "Stake pool",
    },
]
const faqs = [
    {
        question: "The Trillion Auction",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "How long will the presale last?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "How can I place my bid?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "How does it work?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "Who wins the round?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "After confirming my bid the tokens are mine already?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "Does my rejected bid carried to the next round?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "How many bids can I do per round?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "How do I change my bid?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
    {
        question: "My bid was accepted. Where do I access my tokens?",
        answer: (
            <p>
                We at NDB have the pleasure to announce the presale of our NDB token. The purpose of
                this auction is to discover the price of a new token given the market demand. For
                more information about the token, please visit our Whitepaper or our Websites.
            </p>
        ),
    },
]

const FAQ = () => {
    return (
        <main className="faq-page">
            <Header />
            <section className="container">
                <Tabs className="faq__tabs">
                    <TabList className="faq__tabs-list">
                        {faq_tabs.map((item, idx) => (
                            <Tab className="faq__tabs-tab" key={idx}>
                                {item.label}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanel>
                        <Tabs className="sub-faq__tabs">
                            <TabList className="sub-faq__tabs-list">
                                {auction_faq_tabs.map((item, idx) => (
                                    <Tab className="sub-faq__tabs-tab" key={idx}>
                                        {item.label}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanel>
                                <h5 className="text-uppercase">
                                    <span className="txt-green">W</span>
                                    hy an NDB token?
                                </h5>
                                <p className="divide my-3"></p>
                                <p>
                                    <strong>
                                        Since the beginning of NDB’s project the vision is to
                                        provide clean green technologies to the world.
                                    </strong>{" "}
                                    The NDB token is not a security token nor does it represent any
                                    shares of NDB SA. By using NDB token you will be able to
                                    contribute to the development of our technologies and our
                                    vision. We plan to expand our ecosystem to multiple areas
                                    including deep space exploration, sustainable fashion, quantum
                                    computing, and more.
                                    <br />
                                    <br />
                                    We will issue 918.000.000 NDB tokens, new tokens will never be
                                    created,{" "}
                                    <strong>
                                        you will be able to change, interact, and transform your NDB
                                        token in the open market or inside our ecosystem boosting
                                        the advancement of research projects by either placing your
                                        NDB token inside a pool.
                                    </strong>{" "}
                                    Actual pools can be organised within our ecosystem and our
                                    partners, in this case putting your NDB tokens in a pool
                                    contributes to the development of the pool’s owner technologies
                                    and future products that will eventually be delivered in
                                    collaboration with NDB SA.
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <p>Volt Token content</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Stake pool content</p>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>

                    <TabPanel>
                        <Tabs className="sub-faq__tabs">
                            <TabList className="sub-faq__tabs-list">
                                <Tab className="sub-faq__tabs-tab">Auction</Tab>
                            </TabList>
                            <TabPanel>
                                <p className="question-label">Question</p>
                                <div className="faq-list">
                                    {faqs?.map((question, idx) => (
                                        <Accordion {...question} key={idx} />
                                    ))}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </section>
        </main>
    )
}

export default FAQ
