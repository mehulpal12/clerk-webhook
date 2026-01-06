'use client'

import { usePathname, useRouter } from 'next/navigation'

export const SearchUsers = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='flex text-center justify-center '>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const queryTerm = formData.get('search') as string
          router.push(pathname + '?search=' + queryTerm)
        }}
      >
        <div className='bg-white text-black  rounded-md space-x-2'>
          <input placeholder='search for users' className='p-4' id="search" name="search" type="text" />
          <button type="submit" className='p-4'>Submit</button>
        </div>
      </form>
    </div>
  )
}