import { useState } from "react"
import styles from "./index.module.scss"

interface Key {
    mainText: string | number, otherText: string, disable: boolean, bgColor: string
}

const bgColor = '#fff'
const activeColor = 'rgb(179, 179, 206)'

const numberKeys = [
    [
        { mainText: 1, otherText: '', disable: false, bgColor, activeColor },
        { mainText: 2, otherText: 'ABC', disable: false, bgColor, activeColor },
        { mainText: 3, otherText: 'DEF', disable: false, bgColor, activeColor }
    ],
    [
        { mainText: 4, otherText: 'GHI', disable: false, bgColor, activeColor },
        { mainText: 5, otherText: 'JKL', disable: false, bgColor, activeColor },
        { mainText: 6, otherText: 'MNO', disable: false, bgColor, activeColor }
    ],
    [
        { mainText: 7, otherText: 'PQRS', disable: false, bgColor, activeColor },
        { mainText: 8, otherText: 'TUV', disable: false, bgColor, activeColor },
        { mainText: 9, otherText: 'WXYZ', disable: false, bgColor, activeColor }
    ],
    [
        { mainText: '', otherText: '', disable: true, bgColor: '#eee', activeColor: '#eee' },
        { mainText: 0, otherText: '', disable: false, bgColor, activeColor },
        { mainText: '删除', otherText: '', disable: false, bgColor: '#D2D5DC', activeColor }
    ]
];

interface Props {
    onKeyPress: (key: number) => void,
    onDelete: () => void,
}

const Keyboard = ({ onKeyPress, onDelete }: Props,) => {
    let [selectedKeyString, setSelectKeyString] = useState<number | string>('')
    const handleKeyPress = (key: Key) => {
        console.log('key:', key)
        if (key.disable) return
        if (key.mainText === '删除') {
            return onDelete()
        }
        onKeyPress(Number(key.mainText))
        setSelectKeyString(key.mainText)
        setTimeout(() => {
            setSelectKeyString('')
        }, 50)
    }

    return (
        <div className={styles.keyboard}>
            {
                numberKeys.map((group, groupIndex) => (
                    <div key={groupIndex} className={styles.row}>
                        {group.map((key, keyIndex) => (
                            <div
                                className={styles.key}
                                style={{ backgroundColor: selectedKeyString === key.mainText ? key.activeColor : key.bgColor }}
                                key={`${groupIndex - keyIndex}`} onClick={() => { handleKeyPress(key) }}
                            >{key.mainText}</div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}
export default Keyboard