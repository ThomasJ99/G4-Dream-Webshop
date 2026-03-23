import { LogOut, Settings, User } from "lucide-react";


export default function ProfileDropdown() {
  return (
    <ul className="absolute left-58 bottom-0 flex flex-col gap-1 p-2 bg-white border border-gray-300 rounded-md text-gray-600">
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-purple-800 hover:text-white p-4 rounded-md">Profile <User height={18} width={18}/></li>
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-purple-800 hover:text-white p-4 rounded-md">Settings <Settings height={18} width={18}/></li>
      <li className="flex flex-row justify-between gap-4 text-sm hover:bg-purple-800 hover:text-white p-4 rounded-md">Logout <LogOut height={18} width={18}/></li>
    </ul>
  )
}
