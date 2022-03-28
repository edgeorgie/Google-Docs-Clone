import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-md">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-2xl text-gray-700">Docs</h1>

      <div className="mx-5 flex flex-grow items-center rounded-lg bg-gray-100 p-5 py-2 text-gray-600 focus-within:text-gray-600 focus-within:shadow-md md:mx-20">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          className="flex-grow bg-transparent px-5 text-base outline-none"
          placeholder="Search"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="ml-5 h-20 w-20 border-0 md:ml-20"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        loading="lazy"
        className="ml-2 h-12 w-12 cursor-pointer rounded-full"
        src="https://lh3.googleusercontent.com/a-/AOh14Gh67JwFsg77pra-bupCBzkhROEsgPNilZYDtQ7d=s288-p-rw-no"
        alt="Profile"
      />
    </header>
  )
}
