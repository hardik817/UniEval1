import React from "react";
import "../styles/navbar.css"
import bell from "../../assets/bell.png"
function Navbar() {
    return (
        <>
            <h1 id="unieval">UniEval</h1>
            <hr />
            <img src={bell} id="bell" />
        </>
    )
}
export default Navbar;