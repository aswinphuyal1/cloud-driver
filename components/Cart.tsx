import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'

const Cart = ({file}:{file:Models.Document}) => {
  return (
    <Link href={file.url} target='_blank' className='file-card'>
        <div className='flex justify-between'>
<Thumbnail name={file.name} type={file.type} extension={file.extensaion} url={file.url} className='!size-20'imageClassName='!size-11'/>
<div>
    
</div>
        </div>
{file.name}
    
    </Link>
  )
}

export default Cart