import React from 'react'

const MessagesShimmer = ({index}) => {
  return (
    <div className={`flex w-52 flex-col gap-4 m-4 ${index % 2 !== 0 ? 'self-end' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
    </div>
  )
}

export default MessagesShimmer;