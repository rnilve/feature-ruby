import { Outlet } from "react-router-dom";
import Logo from "../../images/logo.png";

export function Base() {
  return (
    <>
      <header className="fixed pb-6 w-full bg-gray-800 h-16 z-10">
        <div className="w-full h-16"></div>
      </header>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <img src={Logo} alt="logo" className="w-32 h-12" />
          <ul className="space-y-2 font-medium pt-8">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 hover:rounded-lg border-b dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3 text-lg font-semibold">Inicio</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 pt-20">
        <Outlet />
      </div>
    </>
  );
}
