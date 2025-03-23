import React from "react";

const Footer: React.FC = () => {
    const ahora = new Date;
    const año = ahora.getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 w-full mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {año} mbuilder. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
