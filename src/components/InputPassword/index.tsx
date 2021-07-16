import React, { useState, useEffect, useRef, useImperativeHandle, ChangeEvent, forwardRef } from "react"
import styles from "./index.module.scss"

interface Props {
    focus: boolean;
    fields: number;
    onComplete: (value: number) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

const InputPassword = ({ focus, fields, onComplete, onBlur, onFocus }: Props, ref: HTMLInputElement) => {
    const [fakeInputList, setFakeInputList] = useState<number[]>([])

    let [password, setPassword] = useState<string>('')
    let [passwordLength, setPasswordLength] = useState<number>(0)
    let passwordRef = useRef<string | null>(null)
    passwordRef.current = password

    const passwordInputEl = useRef<HTMLInputElement | undefined>()

    // @ts-ignore
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
        toggleFocus()
    }, [focus])

    useEffect(() => {
        updatePassword()
    }, [password])

    const buildFakeInput = () => {
        if (!fields) return
        setFakeInputList(new Array(fields).fill(''))
        focus && passwordInputEl.current?.focus()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        if (!Number.isFinite(Number(value))) {
            const newValue = value.slice(0, value.length - 1)
            setPassword(newValue)
            return
        }
        if (passwordRef.current && passwordRef.current.length > fields) return
        setPassword(value)
    }

    const updatePassword = () => {
        const passwordString = String(password === null ? "" : password)
        setPasswordLength(passwordString.length)

        if (passwordString.length === fields) {
            onComplete(Number(passwordRef.current))
        }
    }

    const toggleFocus = () => {
        focus && passwordInputEl.current?.focus()
        !focus && clearPassword()
    }

    const clearPassword = () => {
        setPassword('')
        if (!passwordInputEl.current) return
        passwordInputEl.current.value = ''
    }

    const handleBlur = () => {
        console.log('blur')
        onBlur?.()
        handleFocus()
    }

    const handleFocus = () => {
        console.log('focus')
        onFocus?.()
        focus && passwordInputEl.current?.focus()
    }

    return (
        <div className={styles.inputPassword} onClick={handleFocus}>
            <div className={styles.fakeBox}>
                {
                    fakeInputList.map((item, index) => {
                        return (
                            <div key={index} className={styles.wrapper}>
                                {/* <div className={`${styles.dot} ${index < passwordLength ? styles.show : ''}`}></div> */}
                            </div>
                        )
                    })
                }
            </div>

            <input type="tel"
                value={password}
                maxLength={fields}
                className={styles.password}
                // @ts-ignore
                ref={passwordInputEl}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            {/* <div className={styles.fakeBox}>
                {
                    fakeInputList.map((item, index) => {
                        return (
                            <div key={index} className={styles.wrapper}>
                                <div className={`${styles.dot} ${index < passwordLength ? styles.show : ''}`}></div>
                            </div>
                        )
                    })
                }
            </div> */}
            <div className={styles.version}>{passwordLength}</div>
        </div>
    )
}
// @ts-ignore
export default forwardRef(InputPassword)