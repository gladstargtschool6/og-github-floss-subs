// import { useRouter } from 'next/router';

export default function About() {
    return (
        <div className="max-w-6xl mx-auto p-44 sm:py-18 px-2 lg:px-8 lg:pl-1">
             <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Company Blog
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto p-10">
            Connect Company Blog Feed Here
            <br />
            <span className="text-base">A great place for company news, insights and updates</span>
          </p>
          <div className="relative self-center mt-6 bg-primary-2 rounded-lg p-0.5 flex sm:mt-8 border border-accents-0"></div>
        </div>
        </div>

    )
}