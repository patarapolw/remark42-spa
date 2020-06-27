import Link from 'next/link'
import { useRouter } from 'next/router'
import { createRef, useEffect } from 'react'

declare global {
  interface Window {
    REMARK42: any
  }
}

const CommentLayout = ({ children }: {
  children: React.ReactNode
}) => {
  const { pathname } = useRouter()
  const remark42Ref = createRef<HTMLDivElement>()

  let remark42Instance: any = null
  const initRemark42 = () => {
    if (window.REMARK42) {
      if (remark42Instance) {
        remark42Instance.destroy()
      }

      remark42Instance = window.REMARK42.createInstance({
        node: remark42Ref.current,
        site_id: process.env.REMARK42_SITE_ID
      })
    }
  }

  useEffect(() => {
    initRemark42()
  }, [pathname])

  // Router.beforePopState(() => {
  //   if (remark42Instance) {
  //     remark42Instance.destroy()
  //   }

  //   return true
  // })

  return (
    <section>
      <nav>
        <ul>
          <li className={pathname === '/' ? 'active' : ''}>
            <Link href="/"><a>Home</a></Link>
          </li>
          <li className={pathname === '/another' ? 'active' : ''}>
            <Link href="/another"><a>Another</a></Link>
          </li>
        </ul>
      </nav>

      <main>
        {children}

        <article>
          <h2>Comments</h2>
          <div ref={remark42Ref} />
        </article>
      </main>
    </section>
  )
}

export default CommentLayout
