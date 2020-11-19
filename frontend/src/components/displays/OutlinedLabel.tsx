import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

export enum OutlineColors {
    Red, Green
}

interface OutlinedLabelProps {
    input: string;
    setInput(arg: string): void;
    placeholder: string;
    color: OutlineColors | null;
}

const OutlinedLabel: React.FC<OutlinedLabelProps> = ({ input, setInput, placeholder, color }) => {
    const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined)

    useEffect(() => {
        switch(color) {
            case OutlineColors.Green:
                setStyle({
                    borderColor: 'green',
                    opacity: 0.7,
                    borderWidth: '3px'
                })
                break
            case OutlineColors.Red:
                setStyle({
                    borderColor: 'red',
                    opacity: 0.7,
                    borderWidth: '3px'
                })
                break
        }

        setTimeout(() => {
            setStyle(undefined)
        }, 750)
    }, [color])

    return (
        <div>
            <Form.Control 
                style={style}
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                placeholder={placeholder} />
        </div>
    )
}

export default OutlinedLabel