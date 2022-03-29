import Head from 'next/head'
import { Header } from '../components/Header'
import { Login } from '../components/Login'
import Icon from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/client'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase/compat/app'
import {
  useCollectionOnce,
} from 'react-firebase-hooks/firestore'
import { DocumentRow } from '../components/DocumentRow'

const Home = () => {
  const [session, loading] = useSession()
  
  if (!session) return <Login />
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'))

  const createDocument = () => {
    if (!input) return;

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          type='text'
          className='outline-none- w-full'
          placeholder='Enter name of document...'
          onKeyDown={e => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={(e) => setShowModal(false)}
          ripple='dark'
        >
          Cancel
        </Button>
        <Button
          color='blue'
          onClick={createDocument}
          ripple='light'
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
      
  )

  return (
    <div>
      <Head>
        <title>Google Docs - Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}

      <section className="bg-[#F8F9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>

            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-none"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="delay-250 relative h-52 w-40 cursor-pointer border-2 transition ease-in-out hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-700">
              Blank
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="mx-auto max-w-3xl py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">My documents</h2>
            <span className="mr-12">Date created</span>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
