import { useState, useEffect, useCallback, useRef, useLayoutEffect, useImperativeHandle, Ref, forwardRef, ChangeEvent } from "react"
import styles from "./index.module.scss"
import CodeDisplayBox from '../CodeDisplayBox'

interface Props {
    fields: number,
    isNumber?: boolean;//是否纯数字
    isPassword?: boolean; // 是否加密显示
    onComplete: (value: string) => void
}

export interface ClearRef {
    clear: () => void;
    focus: () => void;
}

const Verification = ({ fields, isNumber = false, isPassword = false, onComplete }: Props, ref: Ref<ClearRef>) => {
    const [words, setWords] = useState<string>('')
    const wordsRef = useRef<string | null>(null)
    wordsRef.current = words

    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => {
        return {
            clear: clearWords,
            focus: handleFocus
        }
    })

    useEffect(() => {
        return () => {
            clearWords()
        }
    }, [])

    useEffect(() => {
        updateWords()
    }, [words])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value
        if (wordsRef.current && wordsRef.current.length > fields) return
        const newWords = `${value || ''}`
        setWords(newWords)
    }

    const updateWords = () => {
        const wordsString = String(words === null ? "" : words)
        if (wordsString.length === fields) {
            onComplete(wordsRef.current || '')
        }
    }

    const clearWords = () => {
        setWords('')
        if (!inputRef.current) return
        inputRef.current.value = ''
    }

    const handleFocus = useCallback(() => {
        if (!inputRef.current) return
        inputRef.current.focus()

        console.log('focus')
    }, [])

    return (
        <div className={styles.verification}>
            {
                !isNumber && <input
                    ref={inputRef}
                    className={styles.mainInput}
                    type="password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    maxLength={fields}
                    onChange={handleChange}
                />
            }

            {
                isNumber && <input
                    ref={inputRef}
                    className={styles.mainInput}
                    type="text"
                    inputMode="numeric"
                    autoCorrect="off"
                    autoCapitalize="off"
                    maxLength={fields}
                    onChange={handleChange}
                />
            }

            <div onClick={handleFocus}>
                <CodeDisplayBox length={fields} words={words} isPassword={isPassword} />
            </div>
        </div>
    )
}
export default forwardRef(Verification)