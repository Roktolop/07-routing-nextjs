import Link from 'next/link';
import css from './SidebarNotes.module.css'
import { fetchCategories } from '@/lib/api';

export default async function SidebarNotes() {
  const categories = await fetchCategories();


  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All
        </Link>
      </li>
      {/* список тегів */}
      {categories.map(category =>
        <li className={css.menuItem} key={category.id}>
          <Link href={`/notes/filter/${category.id}`} className={css.menuLink}>
            {category.name}
          </Link>
        </li>)
      }
    </ul>

  )
}