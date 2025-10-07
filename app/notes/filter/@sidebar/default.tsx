import Link from 'next/link';
import css from './SidebarNotes.module.css'

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];



export default async function SidebarNotes() {

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      {tags.map(tag =>
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>)
      }
    </ul>

  )
}