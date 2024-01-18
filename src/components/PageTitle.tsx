import React from 'react'

type Props = {
    title: string
}

const PageTitle = ({ title }: Props) => {
    return (
        <h1 className='font-bold text-4xl mb-10 text-gray-600'>{title}</h1>
    )
}

export default PageTitle;