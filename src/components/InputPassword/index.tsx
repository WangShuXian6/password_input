import React, { useState, useEffect, useRef, useImperativeHandle, ChangeEvent, forwardRef } from "react"
import styles from "./index.module.scss"

interface Props {
    focus: boolean;
    fields: number;
    onComplete: (value: number) => void;
}

const InputPassword = ({ focus, fields, onComplete }: Props, ref: HTMLInputElement) => {
    const [fakeInputList, setFakeInputList] = useState<number[]>([])
    console.log(ref)

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
        setTimeout(() => {
            focus && passwordInputEl.current?.focus()
        }, 5000)
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
    }

    const handleBlur = () => {
        focus && passwordInputEl.current?.focus()
    }

    return (
        <div className={styles.inputPassword}>
            <input type="tel"
                value={password}
                maxLength={fields}
                className={styles.password}
                // @ts-ignore
                ref={passwordInputEl}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <div className={styles.fakeBox}>
                {
                    fakeInputList.map((item, index) => {
                        return (
                            <div key={index} className={styles.wrapper}>
                                <input type="password"
                                    value={index < passwordLength ? index : ''}
                                    readOnly
                                    className={styles.fakeInput}
                                    maxLength={1}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
// @ts-ignore
export default forwardRef(InputPassword)