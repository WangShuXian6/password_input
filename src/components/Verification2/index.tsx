import { useState, useEffect, useCallback, useRef, useLayoutEffect, useImperativeHandle, Ref, forwardRef, ChangeEvent, KeyboardEvent } from "react"
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

const Verification2 = ({ fields, isNumber = false, isPassword = false, onComplete }: Props, ref: Ref<ClearRef>) => {
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

    // useEffect(() => {
    //     updateWords()
    // }, [words])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!inputRef.current) return
        moveCursorToEnd()
        console.log("e?.target?.value::", e?.target?.value)
        const value = filterCharacters(e?.target?.value)
        console.log('value after filter::', value)
        inputRef.current.value = value
        setWords(value || '')
        if (value.length === fields) {
            console.log('value.length === fields')
            onComplete(value || '')
            return
        }

        if (value.length > fields) {
            console.log('value.length > fields')
            inputRef.current.value = value.slice(0, value.length - 1)
            setWords(inputRef.current.value || '')
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
        moveCursorToEnd()
        console.log('focus')
    }, [])

    // const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     console.log('e:', e.target)
    // }

    const filterCharacters = (characters: string): string => {
        if (isNumber) {
            return characters.replace(/[^0-9]+/g, "")
        }
        return characters.replace(/[^0-9A-Za-z]+/g, "")
    }

    const moveCursorToEnd = () => {
        if (!inputRef.current) return
        setTimeout(() => {
            inputRef.current?.focus()
        }, 10)

        setTimeout(() => {
            inputRef.current?.setSelectionRange(-1, -1);
            //光标定位到末尾
        }, 20)
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log('keyDown::', e)
        console.log('keyDown:key:', e.key)
    }

    return (
        <div className={styles.verification}>
            <div onClick={handleFocus}>
                <CodeDisplayBox length={fields} words={words} isPassword={isPassword} />
            </div>

            {
                !isNumber && new Array(length).fill('').map((item, index) => (
                    <input
                        key={index}
                        //ref={inputRef}
                        className={styles.mainInput}
                        type="password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        maxLength={1}
                        onInput={handleChange}
                        onKeyDown={keyDownHandler}
                    />
                ))
            }

            {
                isNumber && new Array(length).fill('').map((item, index) => (
                    <input
                        key={index}
                        //ref={inputRef}
                        className={styles.mainInput}
                        type="text"
                        inputMode="numeric"
                        autoCorrect="off"
                        autoCapitalize="off"
                        maxLength={1}
                        //onKeyDown={keyUpHandler}
                        onInput={handleChange}
                        onKeyDown={keyDownHandler}
                    />
                ))
            }


        </div>
    )
}
export default forwardRef(Verification2)