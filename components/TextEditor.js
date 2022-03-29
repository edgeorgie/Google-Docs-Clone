import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { db } from '../firebase';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { useSession } from 'next-auth/client';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), { ssr: false });

export const TextEditor = () => {
  const router = useRouter()
  const { id } = router.query

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [session] = useSession()

  const [snapshot] = useDocumentOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(id))

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      )
    }
  }, [snapshot])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection('userDocs').doc(session.user.email).collection('docs').doc(id).set({
      editorState: convertToRaw(editorState.getCurrentContent())
    }, { merge: true })
  }

  return (
    <div className='bg-[#F8F9FA] min-h-screen pb-16'>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName='flex sticky top-0 z-50 !justify-center items-center'
        editorClassName='mt-6 bg-white shadow-lg max-w-6xl mx-auto mb-12 border p-10'
      />
    </div>
  )
}
