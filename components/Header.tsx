import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search';
import Fileuploader from './Fileuploader';
import { Signoutuser } from '@/lib/actions/user.actions';
const Header = ({userid,accountid}:{userid:string;accountid:string}) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <Fileuploader ownerid={userid} accountid={accountid} />
        <form
        //making this component specially a server components
          action={async () => {
            "use server";
            await Signoutuser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}

export default Header