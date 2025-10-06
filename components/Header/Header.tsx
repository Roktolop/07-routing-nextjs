import { fetchCategories } from '@/lib/api'
import TagsMenu from '../TagsMenu/TagsMenu'
import css from './Header.module.css'
import Link from 'next/link'

export default async function Header() {
  const categories = await fetchCategories();
  console.log('categories:', categories);

  return (
    <>
      <header className={css.header}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <TagsMenu categories={categories}></TagsMenu>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}