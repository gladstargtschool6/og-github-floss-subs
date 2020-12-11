import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '../components/UserContext';
import LoadingDots from '../components/ui/LoadingDots';
import Button from '../components/ui/Button';
import { updateUsername } from '../components/updateUser';

function Card({ title, description, footer, children }) {
  return (
    <div className="bg-primary-2 border border-accents-1	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium ">{title}</h3>
        <p className="text-accents-3">{description}</p>
        {children}
      </div>
      <div className="border-t border-accents-1 bg-primary-2 p-4 text-accents-3 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}
export default function Account() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLoaded, user, session, userDetails} = useUser();

  console.log('user:', user);
  console.log('userDetails:', userDetails);

  const [userName, changeName] = useState(userDetails?.full_name);
  const [isEdit, updateInfo] = useState(false);

  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user]);

  const handleSubmit = () => {
    updateUsername(user, userName);
    updateInfo(false);
  };

  return (
    <section className="bg-primary-1 mb-32">
      <div className="max-w-6xl mx-auto py-6 sm:py-18 px-2 lg:px-8 lg:pl-1">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Customer Info Page 
            <br />
            <span className="text-sm">Editing available on Name always & Email when not through 3rd party provider</span>
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Account Details"
          description="Your Information"
          children={
            <div className="text-xl mt-8 mb-4 font-semibold text-accents-3">
              <div className="text-white">Name</div>
              {userDetails ? (
                !isEdit ? (
                  // sometimes the userName gets set before the userDetails are loaded
                  // in that case use the full_name from the userDetails
                  // if the full_name is an empty string this would break without
                  // the last nullish coalescing operator with the empty string
                  `${userName ?? userDetails.full_name ?? ''}`
                ) : (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => changeName(e.target.value)}
                  />
                )
              ) : (
                <div className="h-8 mb-6">
                  <LoadingDots />
                </div>
              )}

              <div className="text-xl mt-8 mb-4 font-semibold">
                <div className="text-white">Email</div>
                {user ? (`${user.email}`) : ('')}
              </div>
            </div>
          }
          footer={
            <>
              {/* <p>We will email you to verify the change.</p>  */}
              <Button
                variant="slim"
                type="button"
                disabled={session && !userLoaded}
                loading={loading}
                onClick={() => (isEdit ? handleSubmit() : updateInfo(true))}
                className="mt-0 block rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900 "
              >
                {isEdit ? 'Update' : 'Edit'}
              </Button>
            </>
          }
        />
        {/* Please use 64 characters at maximum. */}
        <Card
          title="Recently Purchased Items"
          description="These are your 5 most recent items"
          footer={<p>See All Orders Here</p>}
        >
          <p className="text-xl mt-8 mb-4 font-semibold"></p>
        </Card>
      </div>
    </section>
  );
}
