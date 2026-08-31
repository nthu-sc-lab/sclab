import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div>
        <strong>404</strong>
        <h1>找不到這個頁面</h1>
        <p>The requested page is not part of this research map.</p>
        <Link className="button-primary" to="/">返回首頁 Back home</Link>
      </div>
    </section>
  )
}
