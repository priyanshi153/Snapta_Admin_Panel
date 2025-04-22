import React from 'react'
import SignInForm from './SigninForm'
import LeftImage from './LeftPart'

function SignIn() 
{
    return(
        <div className="lg:flex">
        {/* Left Side */}
          <div className='2xl:w-[50%] lg:w-[50%]'>
            <LeftImage />
          </div>
        {/* Right Side */}
          <div className='2xl:w-[50%] lg:w-[50%] w-full'>
            <SignInForm />
          </div>
        </div>
    )
}

export default SignIn