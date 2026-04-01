export default function RoleSwitcher({ role, setRole }) {

  return (

    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 shadow-md rounded-xl px-4 py-2">

      <span className="text-gray-600 font-medium">
        Role
      </span>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-lg outline-none cursor-pointer shadow hover:opacity-90 transition"
      >

        <option value="viewer" className="text-black">
          Viewer
        </option>

        <option value="admin" className="text-black">
          Admin
        </option>

      </select>

    </div>

  );

}