export default function Header({ user }) {
  return (
    <header
      className="
        h-[70px]
        sticky
        top-0
        z-20
        flex
        justify-end
        items-center
        px-8
      "
    >
      {user && (
        <div className="flex items-center gap-4">

          {user?.avatars ? (
            <img
              src={user.avatars}
              alt="avatar"
              className="
                w-12
                h-12
                rounded-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-12
                h-12
                rounded-full
                bg-zinc-800
                flex
                items-center
                justify-center
                text-white
                font-bold
              "
            >
              {user.username
                ?.charAt(0)
                .toUpperCase()}
            </div>
          )}
          <div className="text-right">
            <p className="text-white font-semibold">
              {user.username}
            </p>

            <p className="text-zinc-400 text-sm">
              Usuário ativo
            </p>
          </div>
        </div>
      )}
    </header>
  );
}