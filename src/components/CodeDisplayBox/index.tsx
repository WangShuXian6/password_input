import { useState, useEffect, useCallback, useRef, useLayoutEffect, useImperativeHandle } from "react"
import styles from "./index.module.scss"

interface Props {
    length: number;// code长度
    isPassword?: boolean; // 是否加密显示
    words?: string; // 输入的字符
}

const CodeDisplayBox = ({ length, isPassword = false, words = '' }: Props,) => {
    const [fakeInputList, setFakeInputList] = useState<number[]>([])

    const [codeLength, setCodeLength] = useState<number>(0)

    useEffect(() => {
        buildFakeInput()
    }, [])

    useEffect(() => {
        updateCodeLength()
    }, [words])

    const buildFakeInput = useCallback(() => {
        if (!length) return
        setFakeInputList(new Array(length).fill(''))
    }, [])

    const updateCodeLength = () => {
        const codeString = String(words === null ? "" : words)
        setCodeLength(codeString.length)
    }

    return (
        <div className={styles.codeDisplayBox}>
            {
                fakeInputList.map((item, index) => {
                    return (
                        <div key={index} className={`${styles.wrapper} ${index < words.length ? styles.active : ''}`}>
                            {isPassword && <div className={`${styles.dot} ${index < codeLength ? styles.show : ''}`} />}
                            {words && !isPassword && <div className={styles.word}>{words[index]}</div>}
                            <span className={`${styles.tip} ${index === codeLength ? styles.tipShow : ''}`}></span>
                        </div>
                    )
                })
            }
        </div >
    )
}
export default CodeDisplayBox