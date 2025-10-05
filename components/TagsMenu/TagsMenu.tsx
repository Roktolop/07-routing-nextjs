'use client';

import { Category } from '@/types/note'
import css from './TagsMenu.module.css'
import Link from 'next/link';
import { useState } from 'react';

interface TagsMenuProps {
  categories: Category[];
}

export default function TagsMenu({ categories }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {/* список тегів */}
      {isOpen && <ul className={css.menuList}>

        <li className={css.menuItem}>
          <Link
            href={`/notes/filter/All`}
            className={css.menuLink}
            onClick={() => setIsOpen(false)}>
            All notes
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li key={category.id} className={css.menuItem}>
              <Link
                href={`/notes/filter/${category.id}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}>
                {category.name}
              </Link>
            </li>
          )
        })}
      </ul>}
    </div >

  )
}