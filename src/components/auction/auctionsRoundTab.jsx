import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

const AcutionRoundTab = ({ roundL, roundM, roundH, setState, setSelectedData, selectedData, fnSelectedRoundData }) => {
    return (
        <div>
        {roundM?.getAuctionByNumber && <Tabs
            className="round-tab"
            selectedIndex={selectedData}
            onSelect={(index) => {
                if (index !== selectedData) {
                    setState({ price: 0, amount: 0 })
                    setSelectedData(index)
                }
            }}
        >
            (
                <TabList>
                    <Tab>Round {roundL?.getAuctionByNumber?.number}</Tab>
                    <Tab>Round {roundM?.getAuctionByNumber?.number}</Tab>
                    <Tab>Round {roundH?.getAuctionByNumber?.number}</Tab>
                </TabList>
            )

            <TabPanel>
                Token Available{" "}
                <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
            </TabPanel>
            <TabPanel>
                Token Available{" "}
                <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
            </TabPanel>
            <TabPanel>
                Token Available{" "}
                <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
            </TabPanel>
        </Tabs>}
        </div>
    )
}

export default AcutionRoundTab
