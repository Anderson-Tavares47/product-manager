import React from "react";
import Image from "next/image";
import StoreIcon from "@/assets/img/iLogo.svg";

const Header: React.FC = () => {
  return (
    <header className="bg-[rgb(0,96,177)] shadow sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={StoreIcon} alt="Logo" width={80} height={80} />
          <h1 className="text-xl font-bold text-white">Minha Loja Virtual</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
