import { Category } from '@/types/note'
import css from './TagsMenu.module.css'
import Link from 'next/link';

interface TagsMenuProps {
  categories: Category[];
}

export default function TagsMenu({ categories }: TagsMenuProps) {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>
        Notes ▾
      </button>
      <ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li key={category.id} className={css.menuItem}>
              <Link href={`/notes/filter/${category.id}`} className={css.menuLink}>
                {category.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div >

  )
}