import { useState, useCallback } from "react"
import styles from "./index.module.scss"
import deleteImage from './keyboard_delete@2x.png'
import arrowImage from './keyboard_arrow@2x.png'

interface Key {
    mainText: string | number, otherText: string, disable: boolean, bgColor: string
}

const defaultTitle = '哈银消费金融安全保护中'
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
    // [
    //     { mainText: '', otherText: '', disable: true, bgColor: '#eee', activeColor: '#eee' },
    //     { mainText: 0, otherText: '', disable: false, bgColor, activeColor },
    //     { mainText: '删除', otherText: '', disable: false, bgColor: '#D2D5DC', activeColor }
    // ]
];

const zeroKey = { mainText: 0, otherText: '', disable: false, bgColor, activeColor }
const deleteKey = { mainText: '删除', otherText: '', disable: false, bgColor, activeColor }

interface Props {
    title?: string,
    onKeyPress: (key: number) => void,
    onDelete: () => void,
    onClose?: () => void,
}

const Keyboard = ({ title = defaultTitle, onKeyPress, onDelete, onClose }: Props,) => {
    let [selectedKeyString, setSelectKeyString] = useState<number | string>('')
    const handleKeyPress = useCallback((key: Key) => {
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
    }, [])

    const handleClose = useCallback(() => {
        onClose?.()
    }, [])

    return (
        <div className={styles.keyboard}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <img src={arrowImage} className={styles.arrow} alt="收起键盘" onClick={() => { handleClose() }} />
                {/* <div className={styles.arrow} onClick={() => { handleClose() }}></div> */}
            </div>
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
            <div className={styles.row}>
                <div
                    className={`${styles.key} ${styles.zero}`}
                    style={{ backgroundColor: selectedKeyString === zeroKey.mainText ? zeroKey.activeColor : zeroKey.bgColor }}
                    onClick={() => { handleKeyPress(zeroKey) }}>{zeroKey.mainText}</div>
                <div
                    className={`${styles.key} ${styles.delete}`}
                    style={{ backgroundColor: selectedKeyString === deleteKey.mainText ? deleteKey.activeColor : deleteKey.bgColor }}
                    onClick={() => { handleKeyPress(deleteKey) }}>
                    <img className={styles.delete_icon} src={deleteImage} alt="删除" />
                </div>
            </div>
        </div>
    )
}
export default Keyboard