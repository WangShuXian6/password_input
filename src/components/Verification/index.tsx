import { useState, useCallback } from "react"
import styles from "./index.module.scss"

interface Props {

}

const Verification = ({ }: Props,) => {


    return (
        <div className={styles.verification}>
            <div contentEditable="true" className={''}>Hodor!</div>
        </div>
    )
}
export default Verification