import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote, type CreateNoteProps } from '@/lib/api'
import { NoteTag } from '@/types/note'
import css from './NoteForm.module.css'
import { Formik, Form, ErrorMessage, Field, type FormikHelpers } from 'formik'
import * as Yup from "yup"

interface NoteFormProps {
  onCancel: () => void,
}

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const CreateNoteScheme = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .max(50)
    .required(),
  content: Yup.string()
    .max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(tags)
    .required(),
})

export function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateNoteProps) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onCancel();
    }
  })

  const handleSumbmit = (data: CreateNoteProps, helpers: FormikHelpers<CreateNoteProps>) => {
    createMutation.mutate(data);
    helpers.resetForm();
  }

  const handleCancel = () => {
    onCancel();
  }

  return (
    <Formik initialValues={{
      title: '',
      content: '',
      tag: 'Todo',
    }}
      onSubmit={handleSumbmit}
      validationSchema={CreateNoteScheme}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions} >
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  )
}