import React from 'react'
import { Link } from 'react-router-dom'


type Props = {}

const Forecasts = (props: Props) => {
    return (
        <div>
            <Link to={'/add-forecast'}>Create</Link>
        </div>
    )
}

export default Forecasts