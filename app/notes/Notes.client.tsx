'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import css from './NoteList.module.css'
import { fetchNotes } from '../../lib/api'
import NoteList from '../../components/NoteList/NoteList'
import SearchBox from '../../components/SearchBox/SearchBox'
import { Modal } from '../../components/Modal/Modal'
import { NoteForm } from '../../components/NoteForm/NoteForm'
import { useDebounce } from 'use-debounce'

function NotesClient() {
  const [curPage, setCurPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  const [debouncedValue] = useDebounce(searchValue, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', curPage, debouncedValue],
    queryFn: () => fetchNotes(debouncedValue, curPage),
    placeholderData: keepPreviousData
  })

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
    setCurPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch}></SearchBox>

          <button className={css.button} onClick={handleOpenModal}>Create note +</button>

          {isSuccess && data?.totalPages > 1 &&
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={curPage}
              onPageChange={setCurPage}
            />}

          {isModalOpen &&
            <Modal onClose={handleCloseModal}>
              <NoteForm onCancel={handleCloseModal} />
            </Modal>}
        </header>
        {data?.notes && data.notes.length > 0 &&
          <NoteList notes={data?.notes ?? []} />
        }
      </div>
    </>
  )
}

export default NotesClient
