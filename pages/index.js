import Head from 'next/head'
import { Header } from '../components/Header'
import Icon from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import Image from 'next/image'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Google Docs - Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="bg-[#F8F9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>

            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div className='relative h-52 w-40 border-2 cursor-pointer transition ease-in-out delay-250 hover:border-blue-700'>
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <span className='mt-2 font-semibold text-sm text-gray-700'>Blank</span>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My documents</h2>
            <span className='mr-12'>Date created</span>
            <Icon name='folder' size='3xl' color='gray' />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
