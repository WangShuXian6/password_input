import { useState, useEffect, useRef, useImperativeHandle, forwardRef, Ref } from "react"
import styles from "./index.module.scss"
import Keyboard from '../Keyboard'

interface Props {
    fields: number;
    isKeboardFixed?: boolean;
    onComplete: (value: string) => void;
    children?: any;
}

interface ClearRef {
    clear: () => void;
}

const InputNumber = ({ fields, isKeboardFixed, onComplete, children }: Props, ref: Ref<ClearRef>) => {
    const [fakeInputList, setFakeInputList] = useState<number[]>([])

    let [keyboardShow, setKeyBoardShow] = useState<Boolean>(true)
    let [password, setPassword] = useState<string>('')
    let [passwordLength, setPasswordLength] = useState<number>(0)
    let passwordRef = useRef<string | null>(null)
    passwordRef.current = password

    useImperativeHandle(ref, () => {
        return {
            clear: clearPassword
        }
    })

    useEffect(() => {
        buildFakeInput()
        return () => {
            clearPassword()
        }
    }, [])

    useEffect(() => {
        updatePasswordLength()
    }, [password])

    const buildFakeInput = () => {
        if (!fields) return
        setFakeInputList(new Array(fields).fill(''))
    }

    const handleChange = (key: number) => {
        if (passwordRef.current && passwordRef.current.length >= fields) return
        const newPassword = `${passwordRef.current || ''}${key}`
        setPassword(newPassword)
    }

    const updatePasswordLength = () => {
        const passwordString = String(password === null ? "" : password)
        setPasswordLength(passwordString.length)

        if (passwordString.length === fields) {
            onComplete(passwordRef.current || '')
        }
    }

    const clearPassword = () => {
        setPassword('')
    }

    const handleDelete = () => {
        if (!passwordRef.current) return
        if (passwordRef.current.length < 1) return
        const newPassword = passwordRef.current.slice(0, passwordRef.current.length - 1)
        setPassword(newPassword)
    }


    return (
        <div className={styles.inputNumber}>
            <div className={styles.fakeBox} onClick={() => { setKeyBoardShow(true) }}>
                {
                    fakeInputList.map((item, index) => {
                        return (
                            <div key={index} className={styles.wrapper}>
                                <div className={`${styles.dot} ${index < passwordLength ? styles.show : ''}`}></div>
                                <span className={`${styles.tip} ${index === passwordLength ? styles.tipShow : ''}`}></span>
                            </div>
                        )
                    })
                }
            </div>
            {children}
            {
                keyboardShow && <div className={`${styles.keyboard} ${isKeboardFixed ? styles.fixed : ''}`}>
                    {keyboardShow && !isKeboardFixed && (
                        <div className={styles.fixed_plae}></div>
                    )}
                    <div className={styles.place}>
                        <Keyboard onKeyPress={handleChange} onDelete={handleDelete} onClose={() => { setKeyBoardShow(false) }} />
                    </div>
                </div>
            }
        </div>
    )
}
// @ts-ignore
export default forwardRef(InputNumber)