import React, { useEffect } from "react"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { EmptyAvatar, BaseHair } from "../../utilities/imgImport"

const AVAILABLE = "AVAILABLE"
const UNAVAILABLE = "UNAVAILABLE"
const LOCKED = "LOCKED"
const OWNED = "OWNED"
export default function DressupHorizontalList({
    list = [],
    topic,
    title,
    selectedItem,
    setSelectedItem,
    secondRow,
    hairStyle,
    hairStyles,
}) {
    const isScrollable = true

    const user = useSelector((state) => state.auth?.user)

    const purchased = JSON.parse(user?.avatar?.purchased ?? {})?.[topic] ?? []
    const tierLevel = user?.tierLevel ?? 0

    useEffect(() => {
        let items = document.getElementById(`items-list-view-${secondRow ? "2" : "1"}`)
        items.scrollLeft = selectedItem * 149 - 100
    }, [selectedItem, secondRow])

    return (
        <div className="row m-0">
            <div className="mb-2 ps-0">{title}</div>
            <div
                id={`items-list-view-${secondRow ? "2" : "1"}`}
                className={`row me-4 dress-up-modal-items-horizontal-list border-top border-bottom border-secondary border-1 ${
                    isScrollable ? "d-inline-block" : "d-auto"
                }`}
            >
                {list.length > 0
                    ? list.map((item, index) => {
                          const status = purchased.includes(item.compId)
                              ? OWNED
                              : tierLevel < item.tierLevel
                              ? LOCKED
                              : item.limited !== 0 && item.purchased >= item.limited
                              ? UNAVAILABLE
                              : AVAILABLE
                          return (
                              <div
                                  key={index}
                                  style={{
                                      marginTop: "-1px",
                                  }}
                                  onClick={() =>
                                      setSelectedItem({
                                          index,
                                          updatable: status === OWNED || status === AVAILABLE,
                                      })
                                  }
                                  role="presentation"
                                  className={`border border-4 cursor-pointer ${
                                      selectedItem !== index
                                          ? "border-transparent"
                                          : status === OWNED
                                          ? "border-success"
                                          : status === LOCKED
                                          ? "border-grey"
                                          : status === UNAVAILABLE
                                          ? "border-grey"
                                          : "border-success"
                                  }`}
                              >
                                  <div className="image_div mx-auto">
                                      {topic !== "hairColor" && (
                                          <>
                                              {topic === "hairStyle" || !topic ? (
                                                  <img src={EmptyAvatar} alt="Background Avatar" />
                                              ) : (
                                                  ""
                                              )}
                                              {topic === "hat" ||
                                              topic === "other" ||
                                              topic === "facialStyle" ||
                                              topic === "expression" ? (
                                                  <>
                                                      <img
                                                          src={EmptyAvatar}
                                                          alt="Background Avatar"
                                                      />
                                                      <div
                                                          style={{
                                                              top: "-11%",
                                                              left: "-4%",
                                                              width: "109%",
                                                          }}
                                                      >
                                                          <img src={BaseHair} alt="base hair" />
                                                      </div>
                                                  </>
                                              ) : (
                                                  ""
                                              )}
                                              <div
                                                  compid={list[index]?.compId}
                                                  groupid={list[index]?.groupId}
                                                  style={{
                                                      top: `${list[index]?.top ?? 0}%`,
                                                      left: `${list[index]?.left ?? 0}%`,
                                                      width: `${list[index]?.width ?? 0}%`,
                                                  }}
                                              >
                                                  {parse(list[index]?.svg ?? "")}
                                              </div>
                                          </>
                                      )}
                                      {topic === "hairColor" && (
                                          <>
                                              <img src={EmptyAvatar} alt="Background Avatar" />
                                              <Hair
                                                  hairColor={list[index]}
                                                  style={{
                                                      top: `${hairStyles[hairStyle]?.top ?? 0}%`,
                                                      left: `${hairStyles[hairStyle]?.left ?? 0}%`,
                                                      width: `${
                                                          hairStyles[hairStyle]?.width ?? 0
                                                      }%`,
                                                  }}
                                              >
                                                  {parse(hairStyles[hairStyle]?.svg ?? "")}
                                              </Hair>
                                          </>
                                      )}
                                  </div>
                                  <div className="price_div">
                                      {topic !== "hairColor" && (
                                          <>
                                              {status === AVAILABLE && (
                                                  <>
                                                      {item.price}
                                                      <span className="text-success"> ndb</span>
                                                  </>
                                              )}
                                              {status === UNAVAILABLE && (
                                                  <span className="txt-grey"> unavaiable</span>
                                              )}
                                              {status === LOCKED && (
                                                  <span className="txt-grey"> locked</span>
                                              )}
                                              {status === OWNED && (
                                                  <span className="text-success"> Owned</span>
                                              )}
                                          </>
                                      )}
                                  </div>
                              </div>
                          )
                      })
                    : ""}
            </div>
        </div>
    )
}

const Hair = styled.div`
    svg > path {
        fill: ${(props) => {
            return props.hairColor ? props.hairColor : "#626161"
        }};
    }
`
